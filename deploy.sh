#!/bin/bash

# Exit immediately if a command exits with a non-zero status.
set -e

echo "🚀 Starting deployment..."

# 1. Go to project directory
# cd /home/amine/ohi || { echo "Failed to change directory to /home/amine/ohi"; exit 1; }

# 2. Pull the latest changes from the main branch
echo "Pulling latest changes from Git..."
git checkout main
git pull origin main

# 3. Install/update backend dependencies
echo "Updating backend dependencies..."
cd server
npm install --production
cd ..

# 4. Install/update frontend dependencies and build
echo "Building frontend assets..."
cd front
npm install
npm run build
cd ..

# 5. Deploy frontend assets
echo "Deploying frontend assets to /var/www/html/frontend..."
if [ ! -d "front/dist" ]; then
    echo "Error: Build directory 'front/dist' not found. Aborting."
    exit 1
fi

sudo rm -rf /var/www/html/frontend
sudo mv front/dist /var/www/html/frontend
echo "Frontend assets successfully deployed."


# 6. Reload the application with PM2 for a zero-downtime restart
echo "Reloading application with PM2..."
pm2 reload OHI-Backend

echo "✅ Deployment finished successfully!"