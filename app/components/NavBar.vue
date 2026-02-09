<template>
  <nav class="navbar">
    <div class="nav-container">
      <!-- Logo Section -->
      <NuxtLink to="/" class="logo-link">
        <ClientOnly>
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
        </ClientOnly>
      </NuxtLink>

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
        <li><NuxtLink to="/" class="nav-link" @click="closeMenu">Home</NuxtLink></li>
        <li><NuxtLink to="/nexus" class="nav-link" @click="closeMenu">Nexus</NuxtLink></li>
        <li><NuxtLink to="/about" class="nav-link" @click="closeMenu">About</NuxtLink></li>
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
  if (typeof window === 'undefined') return
  isDarkMode.value = document.documentElement.classList.contains('dark-mode') ||
    (!document.documentElement.classList.contains('light-mode') && 
     window.matchMedia('(prefers-color-scheme: dark)').matches)
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