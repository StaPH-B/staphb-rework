<template>
  <div>
    <NavBar />
  </div>

  <!-- Community Section -->
  <div class="community-section">
    <div class="container">
      <h2 class="section-title">Join Our Community</h2>
      <p class="community-description">
        StaPH-B members possess a wide range of bioinformatics experience, from molecular biologists gaining familiarity with NGS and web-based applications, to experienced practitioners with advanced degrees capable of scripting custom tools.
      </p>
      <div class="social-links">
        <a href="https://github.com/StaPH-B" target="_blank" class="social-link">
          <SocialIcon icon="github" icon-class="social-icon" />
          GitHub
        </a>
        <a href="https://join.slack.com/t/staph-b-dev/shared_invite/zt-w4ivhtq9-2XypNGWXY9vmyeWf0lABng" target="_blank" class="social-link">
          <SocialIcon icon="slack" icon-class="social-icon" />
          Slack
        </a>
        <a href="https://www.youtube.com/channel/UC4GughelEJxkJORLTCd51eg" target="_blank" class="social-link">
          <SocialIcon icon="youtube" icon-class="social-icon" />
          YouTube
        </a>
      </div>
    </div>
  </div>

  <!-- Hero Section -->
  <div class="hero-section">
    <div class="container">
      <img 
        v-if="isDarkMode"
        src="~/assets/images/logos/staphb-logo-circ-black.png" 
        class="hero-logo" 
        alt="StaPH-B Logo" 
      />
      <img 
        v-else
        src="~/assets/images/logos/staphb-logo-circ-white.png" 
        class="hero-logo" 
        alt="StaPH-B Logo" 
      />
      <h2 class="hero-subtitle">State Public Health Bioinformatics Group</h2>
      <p class="hero-description">
        A consortium of public health scientists addressing common barriers impeding bioinformatics implementation in state public health laboratories.
      </p>
      <div class="hero-buttons">
        <NuxtLink to="/about" class="btn btn-primary">Learn More</NuxtLink>
        <a href="https://github.com/StaPH-B" target="_blank" class="btn btn-secondary">
          <SocialIcon icon="github" icon-class="icon" />
          GitHub
        </a>
      </div>
    </div>
  </div>

  <!-- Mission Section -->
  <div class="mission-section">
    <div class="container">
      <h2 class="section-title">Our Mission</h2>
      <div class="mission-items">

        <div class="mission-item">
          <div class="mission-content">
            <h3>Community Building and Collaboration</h3>
            <p>Foster a stronger community and collaborative partnerships between bioinformaticans, growing the impact of genomics and advanced data approaches in public health.</p>
          </div>
          <div class="mission-image">
            <img :src="workshop" alt="A picture of a group of bioinformaticians at a coding workshop." class="mission-image" />
          </div>
        </div>
        
        <div class="mission-item">
          <div class="mission-content">
            <h3>Resource Development</h3>
            <p>Further the development of tools and processes that enhance data quality, analysis efficiency, and access.</p>
          </div>
          <div class="mission-image">
            <img :src="laptop" alt="A picture of someone writing code on a laptop." class="mission-image" />
          </div>
        </div>
        
        <div class="mission-item">
          <div class="mission-content">
            <h3>Knowledge Sharing</h3>
            <p>Construct a library of documentation and training resources providing a centralized location for hosting and indexing materials created both by StaPH-B and the community.</p>
          </div>
          <div class="mission-image">
            <img :src="container" alt="An abstract image of data in cubes." class="mission-image" />
          </div>
        </div>
      </div>
    </div>
  </div>

  <div>
    <Footer />
  </div>
</template>

<script lang="ts" setup>

import container from '~/assets/images/container_data.jpg';
import laptop from '~/assets/images/laptop.jpg';
import workshop from '~/assets/images/ont_workshop.png';


useHead({
  title: 'StaPH-B - State Public Health Bioinformatics Group',
  meta: [
    { name: 'description', content: 'The State Public Health Bioinformatics Group (StaPH-B) is a consortium of public health scientists addressing common barriers in bioinformatics implementation.' }
  ]
})

const isDarkMode = ref(false)
const checkDarkMode = () => {
  isDarkMode.value = document.documentElement.classList.contains('dark-mode')
}
onMounted(() => {
  checkDarkMode()
  
  // Watch for theme changes
  const observer = new MutationObserver(checkDarkMode)
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class']
  })
  
  onUnmounted(() => {
    observer.disconnect()
  })
})
</script>

