<script setup lang="ts">
const route = useRoute()

const { data: page } = await useAsyncData('page-' + route.path, () => {
  // Map route path to content path (e.g., /about -> /page_content/about)
  const contentPath = `/page_content${route.path}`
  return queryCollection('page_content').path(contentPath).first()
})

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}
</script>

<template>
  <ContentRenderer
    v-if="page"
    :value="page"
  />
</template>
