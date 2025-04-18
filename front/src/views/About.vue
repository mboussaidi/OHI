<template>
    <div class="about-container">
        <div class="about-section">
            <div class="top-title">
                <p class="main-title">About us</p>
            </div>
    
            <div class="title-section-about">
                <h2>Who we are? Waht we do?</h2>
            </div>
            <div class="paragraphs-section-about">
    
                <p>Ottawa Halal Initiative (OHI) was established for the purpose of making halal eating an attainable goal for the Muslim population in Ottawa region. We believe in supporting businesses which procure hand-slaughtered Zabiha halal meats - following
                    all the required Islamic guidelines, including the recitation of Bismillah, severing of the major vessels, and humane treatment. This ensures that the meat is both lawful (halal) and pure (tayyib), meeting the highest standards of faith
                    and ethics.
                </p>
    
                <p>On a quarterly basis, we inquire about a restaurant's meat sources, investigate the slaughterhouse/butcher shop to ensure the mandatory conditions are met, and finally, making this information accessible to the public via social media and
                    our website. To further our mission of promoting the consumption of Halal food, restaurants that adhere to the highest standard of Halal (Hand-slaughtered) will be publicly advertised.</p>
    
                <p>Sayyiduna Abu Hurayra (Allah be pleased with him) narrates that the Messenger of Allah (Allah bless him & give him peace) said: “Allah the Almighty is pure and accepts only that which is pure. Allah has commanded the faithful to do that which
                    he commanded the Messengers, and the Almighty has said: “O Messengers! Eat of the pure things and do right”. And Allah the Almighty has said: “O you who believe! Eat of the pure things We have provided you.” Then he (Allah bless him &
                    give him peace) mentioned (the case of) a man who, having journeyed far, is disheveled and dusty and who spreads out his hands to the heavens (saying): “O Lord! O Lord!” —while his food is unlawful, his drink unlawful, his clothing unlawful,
                    and he is nourished unlawfully, so how can he be answered!” (Sahih Muslim)</p>
    
                <h3>Disclaimer: We are not a certifying body. Our aim is to investigate a restaurant's meat supplier and, through careful research, determine whether the supplier follows Shari'ah guidelines. We then share this information with the public.</h3>
    
                <h3>Disclaimer: We only research and verify, NOT certify.</h3>
                <br />
    
                <p>We conduct restaurant assessments every 45-90 days. We recommend verifying any restaurant that hasn't been assessed in over a month, as there could have been alterations in their meat supply during that time.</p>
                <p>At this time our research is limited to exclude frozen products (such as bacon, hotdogs, chicken nuggets, etc.) UNLESS noted.</p>
                <p>Any certified establishment (by HFSAA or HMS) ensures that ALL its products are verified.</p>
    
    
                <p>Please click "more information" for each listing and check thoroughly!</p>
    
                <br />
    
                <div class="title-section-about">
                    <h2>What is Halal Meat?</h2>
                </div>
                <p>Allah Most High says: “O people! Eat of what is in the earth, Halal and Pure, and do not follow the footsteps of Satan. Indeed, for you he is an open enemy.” (Surah al-Baqarah, 168)</p>
    
                <p>The word “Halal” means permissible. Therefore, halal meat is prepared as prescribed by Islamic law, making it permissible for a Muslim to consume.</p>
                <p style="font-weight: bold;">Three conditions must be met for meat to be considered halal: </p>
    
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
                        <p>The name of Allah must be pronounced at the time of slaughtering, whether actually or effectively (such as when it is forgotten by someone who would normally have said it). 
Allah (SWT) says: “Eat not of (meats) over which Allah’s name has not been pronounced. That would be sinful (fisq).” (Surah al-An’am, 121). From this verse, it is clearly deduced that animals that are not slaughtered in Allah’s name are unlawful to consume. All of the jurists from the 4 madhahib (schools of thought) hold this opinion. An exception is found with certain jurists and only on the condition that the tasmiyah was left out unintentionally. Imam As-Shafi’i (RA) does say in his book “al-Umm” that even if it is done intentionally, it is still lawful to consume; however, this is only if the individual is not habitual in doing so (Kitab al-Umm, 2/227)</p>
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
</template>
  
<!--<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'About'
});
</script>-->


<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
    name: 'About',
    setup() {
        const faqOpen = ref([false, false, false]); // One for each condition

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

  