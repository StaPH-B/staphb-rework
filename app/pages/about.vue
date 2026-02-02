<template>
  <div>
    <NavBar />
  </div>

  <!-- About Hero Section -->
  <div class="about-hero">
    <div class="container">
      <h1 class="section-title">About StaPH-B</h1>
          <p class="hero-description">
            The State Public Health Bioinformatics Group (StaPH-B) is a consortium of public health scientists interested in addressing the common barriers impeding bioinformatics implementation in state public health laboratories.
          </p>
          <img class="hero-img" :src="amd" alt=""></img>
    </div>
  </div>

  <!-- Mission Section -->
  <div class="content-section">
    <div class="container">
      <h2 class="section-title">Mission</h2>
      <div class="mission-list">
        <div class="mission-item">
          <h3>Support Infrastructure</h3>
          <p>Support the construction and maintenance of bioinformatics infrastructure within regional state PHLs.</p>
        </div>
        <div class="mission-item">
          <h3>Provide Training</h3>
          <p>Provide training for public health scientists on the fundamentals and practice of bioinformatics.</p>
        </div>
        <div class="mission-item">
          <h3>Develop Resources</h3>
          <p>Develop bioinformatics resources including tools, pipelines, documentation.</p>
        </div>
        <div class="mission-item">
          <h3>Close partnership with CDC and APHL</h3>
          <p>Maintain a strong working relationship with <a href="https://www.cdc.gov/advanced-molecular-detection/index.html">CDC's AMD program</a> and <a href="https://www.aphl.org/">APHL</a> ensures our efforts have a strong impact in public health.</p>
        </div>
      </div>
    </div>
  </div>

  <!-- Who We Are Section -->
  <div class="content-section" style="background: var(--color-bg-secondary);">
    <div class="container">
      <h2 class="section-title">Who We Are</h2>
      <div class="about-text">
        <p>
          StaPH-B members possess a wide range of genomics and bioinformatics experience, from molecular biologists gaining familiarity with NGS and web-based applications, to experienced practitioners with advanced degrees in the field capable of scripting custom tools. This diversity of experience allows StaPH-B to approach problems from a multitude of perspectives and develop high-efficacy solutions that are both technically sound, and practical to public health investigations.
        </p>
      </div>
    </div>
  </div>

  <!-- Our History Section -->
  <div class="content-section">
    <div class="container">
      <h2 class="section-title">Our History</h2>
      <div class="content-items">
        <div class="content-item">
          <div class="content-card-text">
            <p>
              It all began with four bioinformaticians — Kevin Libuit, Sean Wang, Kelly Oakeson, and Joel Sevinsky. By “four,” we mean at least that many of us were regularly pestering Heather Carleton for help with the bioinformatics of enteric pathogens during the winter of 2016-2017. In an inspired move (and perhaps in self-defense), Heather suggested we “talk amongst ourselves” instead. She shared our contact information, and just like that, StaPH-B was born.
            </p>
          </div>
          <div class="content-image">
            <img :src="origin" alt="Bioinformatics coding work" class="content-image" />
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Community Links Section -->
  <div class="community-section">
    <div class="container">
      <h2 class="section-title">Join Our Community</h2>
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
import origin from '~/assets/images/staphb-aphl2017.jpg';
import amd from '~/assets/images/staphb_amd_2017_small.jpg';

useHead({
  title: 'About - StaPH-B',
  meta: [
    { name: 'description', content: 'Learn about the State Public Health Bioinformatics Group (StaPH-B), our mission, and history.' }
  ]
})
</script>

<style scoped>
.about-hero {
  padding: 5rem 0;
  text-align: center;
  background: var(--color-bg-primary);
}

.about-hero .hero-description {
  max-width: 800px;
  margin: 0 auto;
  font-size: 1.125rem;
  line-height: 1.7;
  color: var(--color-text-secondary);
}

.about-hero .hero-img {
  margin: 3em auto;
  font-size: 1.125rem;
  line-height: 1.7;
  color: var(--color-text-secondary);
  width: 100%;
  max-width: 600px;
  height: auto;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
}


.mission-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  margin-top: 2rem;
}

.mission-item {
  padding: 1.5rem;
  background: var(--color-bg-secondary);
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border-primary);
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-normal);
}

.mission-item:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-md);
}

.mission-item h3 {
  font-size: 1.25rem;
  margin: 0 0 0.75rem;
  color: var(--color-primary);
}

.mission-item p {
  font-size: 1rem;
  line-height: 1.6;
  color: var(--color-text-secondary);
  margin: 0;
}

@media (max-width: 768px) {
  .mission-list {
    grid-template-columns: 1fr;
  }
}

.about-text {
  max-width: 900px;
  margin: 0 auto;
}

.about-text p {
  font-size: 1.125rem;
  line-height: 1.7;
  color: var(--color-text-secondary);
  margin: 0;
}

.content-items {
  display: flex;
  flex-direction: column;
  gap: 4rem;
  margin-top: 2rem;
}

.content-item {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;
}

.content-card-text {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.content-card-text p {
  font-size: 1.125rem;
  color: var(--color-text-secondary);
  line-height: 1.7;
  margin: 0;
}

.content-image {
  width: 100%;
  max-width: 500px;
  height: auto;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
}

@media (max-width: 1024px) {
  .content-item {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}
</style>