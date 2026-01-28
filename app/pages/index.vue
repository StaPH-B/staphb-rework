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
            <h3>Infrastructure</h3>
            <p>Support the construction and maintenance of bioinformatics infrastructure within regional state public health laboratories.</p>
          </div>
          <div class="mission-image">
            <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='500' height='300'%3E%3Crect fill='%23e5e7eb' width='500' height='300'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='18' text-anchor='middle' dominant-baseline='middle' fill='%236b7280'%3EInfrastructure Image Placeholder%3C/text%3E%3C/svg%3E" alt="Infrastructure" class="placeholder-image" />
          </div>
        </div>
        
        <div class="mission-item">
          <div class="mission-content">
            <h3>Training</h3>
            <p>Provide training for public health scientists on the fundamentals and practice of bioinformatics.</p>
          </div>
          <div class="mission-image">
            <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='500' height='300'%3E%3Crect fill='%23e5e7eb' width='500' height='300'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='18' text-anchor='middle' dominant-baseline='middle' fill='%236b7280'%3ETraining Image Placeholder%3C/text%3E%3C/svg%3E" alt="Training" class="placeholder-image" />
          </div>
        </div>
        
        <div class="mission-item">
          <div class="mission-content">
            <h3>Development</h3>
            <p>Development of bioinformatics resources including tools, pipelines, and documentation.</p>
          </div>
          <div class="mission-image">
            <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='500' height='300'%3E%3Crect fill='%23e5e7eb' width='500' height='300'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='18' text-anchor='middle' dominant-baseline='middle' fill='%236b7280'%3EDevelopment Image Placeholder%3C/text%3E%3C/svg%3E" alt="Development" class="placeholder-image" />
          </div>
        </div>
        
        <div class="mission-item">
          <div class="mission-content">
            <h3>Partnership</h3>
            <p>Partner with the CDC and APHL to ensure compatibility and utility of our efforts.</p>
          </div>
          <div class="mission-image">
            <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='500' height='300'%3E%3Crect fill='%23e5e7eb' width='500' height='300'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='18' text-anchor='middle' dominant-baseline='middle' fill='%236b7280'%3EPartnership Image Placeholder%3C/text%3E%3C/svg%3E" alt="Partnership" class="placeholder-image" />
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

<style scoped>
@import '~/assets/css/hero-section.css';
@import '~/assets/css/mission-cards.css';

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.hero-logo {
  height: 20rem;
  width: auto;
  display: block;
  margin: 0 auto 2rem;
}

.section-title {
  font-size: 2.5rem;
  text-align: center;
  margin: 0 0 3rem;
  color: var(--color-text);
}

/* Community Section */
.community-section {
  padding: 5rem 0;
  text-align: center;
  background: var(--color-bg);
}

.community-description {
  max-width: 800px;
  margin: 0 auto 2.5rem;
  font-size: 1.125rem;
  line-height: 1.7;
  color: var(--color-text-secondary);
}

.social-links {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  flex-wrap: wrap;
}

.social-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 2rem;
  background: var(--color-bg-secondary);
  color: var(--color-text);
  text-decoration: none;
  border-radius: 0.5rem;
  font-weight: 600;
  border: 1px solid var(--color-border);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);
  transition: all 0.3s ease;
}

.social-link:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  color: var(--color-primary);
  border-color: var(--color-primary);
  text-decoration: none;
}

.social-icon {
  width: 1.5rem;
  height: 1.5rem;
}

.page-separator {
  height: 1px;
  background-color: var(--color-border-primary);
  margin: 2rem 0;
}

/* Responsive Design */
@media (max-width: 768px) {
  .section-title {
    font-size: 2rem;
  }
}
</style>