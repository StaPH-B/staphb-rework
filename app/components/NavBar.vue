<template>
  <nav class="navbar">
    <div class="nav-container">
      <!-- Logo Section -->
      <a href="/" class="logo-link">
        <img 
          v-if="isDarkMode"
          src="~/assets/images/logos/staphb-logo-white.png" 
          class="logo" 
          alt="StaPH-B Logo" 
        />
        <img 
          v-else
          src="~/assets/images/logos/staphb-logo-black.png" 
          class="logo" 
          alt="StaPH-B Logo" 
        />
      </a>

      <!-- Mobile Menu Toggle -->
      <button 
        @click="toggleMenu" 
        class="mobile-toggle"
        :class="{ 'active': isMenuOpen }"
        aria-label="Toggle navigation menu"
        :aria-expanded="isMenuOpen"
      >
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
      </button>

      <!-- Navigation Links -->
      <ul class="nav-links" :class="{ 'active': isMenuOpen }">
        <li><a href="/" class="nav-link" @click="closeMenu">Home</a></li>
        <li><a href="/nexus" class="nav-link" @click="closeMenu">Nexus</a></li>
        <li><a href="/about" class="nav-link" @click="closeMenu">About</a></li>
        <li>
          <a 
            href="https://github.com/StaPH-B" 
            target="_blank" 
            rel="noopener noreferrer" 
            class="nav-link github-link"
            @click="closeMenu"
          >
            <SocialIcon icon="github" icon-class="github-icon" :aria-hidden="true" />
            <span class="github-text">GitHub</span>
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isMenuOpen = ref(false)
const isDarkMode = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}

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