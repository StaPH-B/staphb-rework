<script setup lang="ts">
// Set theme immediately to prevent flash
useHead({
  script: [
    {
      innerHTML: `
        (function() {
          const theme = localStorage.getItem('theme') || 
                        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
          document.documentElement.classList.add(theme === 'dark' ? 'dark-mode' : 'light-mode');
        })();
      `,
      type: 'text/javascript',
      tagPosition: 'head'
    }
  ]
})
</script>

<template>
  <NuxtRouteAnnouncer />
  <NuxtPage />
</template>
