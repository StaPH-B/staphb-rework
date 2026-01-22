<template>
  <footer class="footer">
    <div class="max-w-screen-xl mx-auto p-6 md:p-8">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
        <!-- About Section -->
        <div>
          <h3 class="text-heading font-semibold mb-3">StaPH-B</h3>
          <p class="text-body text-sm">
            State Public Health Bioinformatics - A collaborative network advancing public health through genomics.
          </p>
        </div>

        <!-- Quick Links -->
        <div>
          <h3 class="text-heading font-semibold mb-3">Quick Links</h3>
          <ul class="space-y-2 text-sm">
            <li>
              <a href="/" class="text-body hover:text-fg-brand transition-colors">Home</a>
            </li>
            <li>
              <a href="/nexus" class="text-body hover:text-fg-brand transition-colors">Nexus</a>
            </li>
            <li>
              <a href="/about" class="text-body hover:text-fg-brand transition-colors">About</a>
            </li>
            <li>
              <a href="https://github.com/StaPH-B" target="_blank" rel="noopener noreferrer" class="text-body hover:text-fg-brand transition-colors">
                GitHub
              </a>
            </li>
          </ul>
        </div>

        <!-- Theme Toggle & Contact -->
        <div>
          <h3 class="text-heading font-semibold mb-3">Settings</h3>
          <div class="flex items-center gap-3 mb-4">
            <span class="text-body text-sm">Theme:</span>
            <button 
              @click="toggleTheme" 
              class="flex items-center gap-2 px-3 py-2 bg-neutral-secondary-soft rounded-base text-body hover:bg-neutral-tertiary transition-colors focus:outline-none focus:ring-2 focus:ring-neutral-tertiary"
              :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
            >
              <!-- Sun icon -->
              <svg v-if="isDark" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
              </svg>
              <!-- Moon icon -->
              <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
              </svg>
              <span class="text-sm">{{ isDark ? 'Light' : 'Dark' }}</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Bottom Section -->
      <div class="border-t border-default pt-6">
        <div class="flex flex-col md:flex-row justify-between items-center gap-4">
          <p class="text-body text-sm">
            &copy; {{ currentYear }} StaPH-B. All rights reserved.
          </p>
          <div class="flex items-center gap-4">
            <a href="https://github.com/StaPH-B" target="_blank" rel="noopener noreferrer" class="text-body hover:text-fg-brand transition-colors">
              <SocialIcon icon="github" icon-class="w-6 h-6" :aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue'

const isDark = ref(false)
const currentYear = computed(() => new Date().getFullYear())

const toggleTheme = () => {
  isDark.value = !isDark.value
  if (isDark.value) {
    document.documentElement.classList.add('dark-mode')
    document.documentElement.classList.remove('light-mode')
    localStorage.setItem('theme', 'dark')
  } else {
    document.documentElement.classList.add('light-mode')
    document.documentElement.classList.remove('dark-mode')
    localStorage.setItem('theme', 'light')
  }
}

// Initialize theme on mount
onMounted(() => {
  const savedTheme = localStorage.getItem('theme')
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  
  isDark.value = savedTheme === 'dark' || (!savedTheme && prefersDark)
  
  if (isDark.value) {
    document.documentElement.classList.add('dark-mode')
  } else {
    document.documentElement.classList.add('light-mode')
  }
})
</script>

<style scoped>
footer {
  background-color: var(--color-bg);
  border-top: 1px solid var(--color-border);
  margin-top: auto;
  transition: background-color 0.3s ease, border-color 0.3s ease;
}
</style>