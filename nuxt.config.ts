export default defineNuxtConfig({
  modules: [
    '@nuxt/content',
    '@nuxtjs/tailwindcss',
  ],
  css: ['~/assets/css/main.css'],
  devtools: { enabled: true },
  compatibilityDate: '2024-04-03',
  app: {
    baseURL: process.env.NODE_ENV === 'production' ? '/staphb-rework/' : '/',
  },
})
