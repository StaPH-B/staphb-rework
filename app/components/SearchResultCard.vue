<template>
  <div class="result-card">
    <div class="result-card-header">
      <h3 class="result-card-title">
        <a :href="item.url" target="_blank" rel="noopener noreferrer">
          {{ item.name }}
        </a>
      </h3>
      <span class="result-card-badge">{{ item.category }}</span>
    </div>
    <p class="result-card-description">{{ item.description }}</p>
    <div class="result-card-footer">
      <div v-if="item.language" class="result-card-meta">
        <svg class="icon-code" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
          <path d="M5.854 4.854a.5.5 0 1 0-.708-.708l-3.5 3.5a.5.5 0 0 0 0 .708l3.5 3.5a.5.5 0 0 0 .708-.708L2.707 8l3.147-3.146zm4.292 0a.5.5 0 0 1 .708-.708l3.5 3.5a.5.5 0 0 1 0 .708l-3.5 3.5a.5.5 0 0 1-.708-.708L13.293 8l-3.147-3.146z"/>
        </svg>
        <span>{{ item.language }}</span>
      </div>
      <div v-if="item.ownership" class="result-card-meta">
        <svg class="icon-org" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
          <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7Zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-5.784 6A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216ZM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"/>
        </svg>
        <span>{{ item.ownership }}</span>
      </div>
    </div>
    <div v-if="item.keywords && item.keywords.length > 0" class="result-card-tags">
      <span v-for="keyword in item.keywords" :key="keyword" class="result-card-tag">
        {{ keyword }}
      </span>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface SearchResultItem {
  name: string
  url: string
  description: string
  category: string
  language?: string
  ownership?: string
  keywords?: string[]
}

defineProps<{
  item: SearchResultItem
}>()
</script>
