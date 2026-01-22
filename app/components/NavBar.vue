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

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background-color: var(--color-bg);
  border-bottom: 1px solid var(--color-border);
  backdrop-filter: blur(10px);
  background-color: rgba(255, 255, 255, 0.95);
  transition: all 0.3s ease;
}

.dark-mode .navbar {
  background-color: rgba(26, 26, 26, 0.95);
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* Logo Section */
.logo-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
  transition: opacity 0.2s ease;
}

.logo-link:hover {
  opacity: 0.8;
}

.logo {
  height: 4rem;
  width: auto;
}

.logo-text {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-text);
  letter-spacing: -0.02em;
}

/* Navigation Links */
.nav-links {
  display: flex;
  align-items: center;
  gap: 2rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-link {
  color: var(--color-text-secondary);
  text-decoration: none;
  font-weight: 500;
  font-size: 1.125rem;
  position: relative;
  transition: color 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.nav-link:hover {
  color: var(--color-primary);
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: -0.25rem;
  left: 0;
  right: 0;
  height: 2px;
  background-color: var(--color-primary);
  transform: scaleX(0);
  transition: transform 0.2s ease;
}

.nav-link:hover::after {
  transform: scaleX(1);
}

.github-link {
  padding: 0.5rem 1rem;
  background-color: var(--color-bg-secondary);
  border-radius: 0.5rem;
  transition: all 0.2s ease;
}

.github-link:hover {
  background-color: var(--color-primary);
  color: white;
}

.github-link::after {
  display: none;
}

.github-icon {
  width: 1.25rem;
  height: 1.25rem;
}

.github-text {
  display: none;
}

/* Mobile Toggle Button */
.mobile-toggle {
  display: none;
  flex-direction: column;
  gap: 0.375rem;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  z-index: 1001;
}

.hamburger-line {
  width: 1.5rem;
  height: 2px;
  background-color: var(--color-text);
  transition: all 0.3s ease;
  border-radius: 2px;
}

.mobile-toggle.active .hamburger-line:nth-child(1) {
  transform: translateY(0.5rem) rotate(45deg);
}

.mobile-toggle.active .hamburger-line:nth-child(2) {
  opacity: 0;
}

.mobile-toggle.active .hamburger-line:nth-child(3) {
  transform: translateY(-0.5rem) rotate(-45deg);
}

/* Responsive Styles */
@media (max-width: 768px) {
  .mobile-toggle {
    display: flex;
  }

  .nav-links {
    position: fixed;
    top: 5rem;
    left: 0;
    right: 0;
    flex-direction: column;
    gap: 0;
    background-color: var(--color-bg);
    border-bottom: 1px solid var(--color-border);
    padding: 1rem;
    transform: translateY(-100%);
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .nav-links.active {
    transform: translateY(0);
    opacity: 1;
    visibility: visible;
  }

  .nav-links li {
    width: 100%;
  }

  .nav-link {
    display: flex;
    padding: 0.75rem 1rem;
    width: 100%;
    border-radius: 0.5rem;
  }

  .nav-link:hover {
    background-color: var(--color-bg-secondary);
  }

  .nav-link::after {
    display: none;
  }

  .github-text {
    display: inline;
  }

  .github-link {
    background-color: transparent;
  }

  .github-link:hover {
    background-color: var(--color-bg-secondary);
    color: var(--color-primary);
  }

  .logo-text {
    font-size: 1.25rem;
  }

  .logo {
    height: 4.5rem;
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  .nav-links {
    gap: 1.5rem;
  }
}
</style>