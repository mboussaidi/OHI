<template>
    <div class="about-container">
        <div class="about-section">
            <div class="top-title">
                <p class="main-title">Halal</p>
            </div>
    
            <div class="title-section-about">
                <h2>What is Halal Meat?</h2>
            </div>
            <div class="paragraphs-section-about">

                <p>Allah Most High says: “O people! Eat of what is in the earth, Halal and Pure, and do not follow the footsteps of Satan. Indeed, for you he is an open enemy.” (Surah al-Baqarah, 168)</p>
                
                <p class="ayah-text">قَالَ اللَّهُ تَعَالَى: يَا أَيُّهَا النَّاسُ كُلُوا مِمَّا فِي الْأَرْضِ حَلَالًا طَيِّبًا وَلَا تَتَّبِعُوا خُطُوَاتِ الشَّيْطَانِ ۚ إِنَّهُ لَكُمْ عَدُوٌّ مُبِينٌ<br>
                [سورة البقرة - الآية: ١٦٨]
                </p>

                <br />
                <p>The word “Halal” means permissible. Therefore, halal meat is prepared as prescribed by Islamic law, making it permissible for a Muslim to consume.</p>
                <p style="font-weight: bold;">Three conditions must be met for meat to be considered halal: </p>

            <div class="faq-section">
    
                <div class="faq-item" @click="toggleFaq(0)">
                    <h3 class="faq-question">
                        Condition #1: Using a sharp tool
                    </h3>
                    <div v-if="faqOpen[0]" class="faq-answer">
                        <p>Most of the four veins (trachea, esophagus, and jugular veins) must be cut using a sharp knife, blade, or any tool with a cutting edge.</p>
                    </div>
                </div>
    
                <div class="faq-item" @click="toggleFaq(1)">
                    <h3 class="faq-question">
                        Condition #2: Saying the Tasmiya (Bismillah)
                    </h3>
                    <div v-if="faqOpen[1]" class="faq-answer">
                        <p>The name of Allah must be pronounced at the time of slaughtering, whether actually or effectively (such as when it is forgotten by someone who would normally have said it). Allah (SWT) says: “Eat not of (meats) over which Allah’s name has not been pronounced. That would be sinful (fisq).” (Surah al-An’am, 121). </p>
                        <p class="ayah-text">قَالَ اللَّهُ تَعَالَى: وَلَا تَأْكُلُوا مِمَّا لَمْ يُذْكَرِ ٱسْمُ ٱللَّهِ عَلَيْهِ وَإِنَّهُۥ لَفِسْقٌ ۗ وَإِنَّ ٱلشَّيَـٰطِينَ لَيُوحُونَ إِلَىٰٓ أَوْلِيَآئِهِمْ لِيُجَـٰدِلُوكُمْ ۖ وَإِنْ أَطَعْتُمُوهُمْ إِنَّكُمْ لَمُشْرِكُونَ<br>
                        [سورة الأنعام - الآية : ١٢١]</p>
                        <p>From this verse, it is clearly deduced that animals that are not slaughtered in Allah’s name are unlawful to consume. The majority of the Muslim jurists throughout history have held firm on to this opinion.</p>
                    </div>
                </div>
    
                <div class="faq-item" @click="toggleFaq(2)">
                    <h3 class="faq-question">
                        Condition #3: The Slaughterer is a Muslim
                    </h3>
                    <div v-if="faqOpen[2]" class="faq-answer">
                        <p>The slaughterer must be a Muslim or Ahl al-Kitab.</p>
                        <p>The slaughterer can also be from the People of the Book (Ahl al-Kitab). However, according to condition number 1, the animal must be slaughtered and not killed by other methods like electrocution or blunt force trauma, which are common today. Furthermore, under condition number 2, the slaughterer must be an Ahl al-Kitab who pronounces Allah’s name at the time of slaughter. Therefore, an Ahl al-Kitab who is a nominal Christian, meaning Christian in name only, and does not invoke Allah’s name during the slaughter would not be considered a valid Ahl al-Kitab slaughter, and the meat would not be permissible to consume.</p>
                    </div>
                </div>
            </div>
    
    
            </div>
    
    
    
        </div>
    
    </div>
</template>
  

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
    name: 'Halal',
    setup() {
        const faqOpen = ref([false, false, false]); 

        const toggleFaq = (index: number) => {
            faqOpen.value[index] = !faqOpen.value[index];
        };

        return {
            faqOpen,
            toggleFaq
        };
    }
});
</script>

  