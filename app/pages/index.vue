<template>
  <div>
    <NavBar />
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
      <div class="mission-grid">
        <div class="mission-card">
          <div class="mission-icon">🏗️</div>
          <h3>Infrastructure</h3>
          <p>Support the construction and maintenance of bioinformatics infrastructure within regional state public health laboratories.</p>
        </div>
        <div class="mission-card">
          <div class="mission-icon">📚</div>
          <h3>Training</h3>
          <p>Provide training for public health scientists on the fundamentals and practice of bioinformatics.</p>
        </div>
        <div class="mission-card">
          <div class="mission-icon">🔧</div>
          <h3>Development</h3>
          <p>Development of bioinformatics resources including tools, pipelines, and documentation.</p>
        </div>
        <div class="mission-card">
          <div class="mission-icon">🤝</div>
          <h3>Partnership</h3>
          <p>Partner with the CDC and APHL to ensure compatibility and utility of our efforts.</p>
        </div>
      </div>
    </div>
  </div>

  <!-- Features Section -->
  <div class="features-section">
    <div class="container">
      <div class="features-grid">
        <NuxtLink to="/videos" class="feature-card">
          <h3>Videos</h3>
          <p>View recordings of our monthly meetings</p>
          <span class="feature-link">Watch Videos →</span>
        </NuxtLink>
      </div>
    </div>
  </div>

  <!-- Projects Section -->
  <div class="projects-section">
    <div class="container">
      <h2 class="section-title">Featured Projects</h2>
      <div class="projects-grid">
        <a href="https://github.com/StaPH-B/docker-builds" target="_blank" class="project-card">
          <div class="project-header">
            <span class="project-icon">🐳</span>
            <h3>Docker Builds</h3>
          </div>
          <div class="project-body">
            <p class="project-description">
              A curated collection of Docker images for bioinformatics tools used in public health laboratories. Ensures reproducibility and easy deployment across systems.
            </p>
            <div class="project-tags">
              <span class="project-tag">Docker</span>
              <span class="project-tag">Containers</span>
              <span class="project-tag">Tools</span>
            </div>
            <div class="project-footer">
              <span class="project-link-text">
                View on GitHub
                <svg class="project-link-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </span>
            </div>
          </div>
        </a>

        <a href="https://github.com/StaPH-B/staphb_toolkit" target="_blank" class="project-card">
          <div class="project-header">
            <span class="project-icon">🧰</span>
            <h3>StaPH-B ToolKit</h3>
          </div>
          <div class="project-body">
            <p class="project-description">
              A Python library for running containerized bioinformatics tools. Simplifies workflow execution and provides a unified interface for multiple tools.
            </p>
            <div class="project-tags">
              <span class="project-tag">Python</span>
              <span class="project-tag">Workflow</span>
              <span class="project-tag">Automation</span>
            </div>
            <div class="project-footer">
              <span class="project-link-text">
                View on GitHub
                <svg class="project-link-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </span>
            </div>
          </div>
        </a>

       

        
      </div>
    </div>
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
@import '~/assets/css/features-cards.css';
@import '~/assets/css/project-cards.css';

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

/* Responsive Design */
@media (max-width: 768px) {
  .section-title {
    font-size: 2rem;
  }
}
</style>