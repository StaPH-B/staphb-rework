<template>
  <div class="nexus-page">
    <NavBar />
    
    <Search 
      :items="searchCategories"
      placeholder="Search StaPH-B Nexus"
      @search="handleSearch"
    />
    
    <div v-if="searchTerm" class="results-container">
      <!-- No results state -->
      <div v-if="showNoResults" class="no-results">
        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" viewBox="0 0 16 16">
          <path d="M6.5 1A1.5 1.5 0 0 0 5 2.5V3H1.5A1.5 1.5 0 0 0 0 4.5v8A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-8A1.5 1.5 0 0 0 14.5 3H11v-.5A1.5 1.5 0 0 0 9.5 1h-3zm0 1h3a.5.5 0 0 1 .5.5V3H6v-.5a.5.5 0 0 1 .5-.5zm1.886 6.914L15 7.151V12.5a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5V7.15l6.614 1.764a1.5 1.5 0 0 0 .772 0zM1.5 4h13a.5.5 0 0 1 .5.5v1.616L8.129 7.948a.5.5 0 0 1-.258 0L1 6.116V4.5a.5.5 0 0 1 .5-.5z"/>
        </svg>
        <h2>No results found</h2>
        <p>Try adjusting your search terms or category</p>
      </div>
      
      <!-- Results grid -->
      <div v-else-if="hasResults" class="results-grid">
        <SearchResultCard
          v-for="result in filteredResults"
          :key="result.url"
          :item="result"
        />
      </div>
    </div>
    
    <Footer />
  </div>
</template>

<script lang="ts" setup>
// ============================================================================
// Types
// ============================================================================

interface SearchResultItem {
  name: string
  url: string
  description: string
  category: string
  language?: string
  ownership?: string
  keywords?: string[]
}

interface PipelineRawData {
  pipeline_name: string
  pipeline_url: string
  pipeline_description: string
  pipeline_language: string
  pipeline_ownership: string
  pipeline_keywords: string | string[]
}

// ============================================================================
// Constants
// ============================================================================

const searchCategories = [
  { label: 'Pipelines', value: 'pipelines' },
  { label: 'Trainings', value: 'trainings' },
  { label: 'Resources', value: 'resources' }
]

// ============================================================================
// Data Loading
// ============================================================================

const { data: pipelinesData } = await useAsyncData('pipelines', async () => {
  return await queryCollection('pipelines').all()
})

// ============================================================================
// Data Transformation
// ============================================================================

/**
 * Transforms pipeline keywords from string or array format to array of trimmed strings
 */
const parseKeywords = (keywords: string | string[]): string[] => {
  if (typeof keywords === 'string') {
    return keywords.split(',').map(k => k.trim())
  }
  return Array.isArray(keywords) ? keywords : []
}

/**
 * Transforms raw pipeline data into SearchResultItem format
 */
const transformPipelineData = (rawData: PipelineRawData): SearchResultItem => ({
  name: rawData.pipeline_name || '',
  url: rawData.pipeline_url || '',
  description: rawData.pipeline_description || '',
  category: 'Pipelines',
  language: rawData.pipeline_language || '',
  ownership: rawData.pipeline_ownership || '',
  keywords: parseKeywords(rawData.pipeline_keywords)
})

// Load and transform all pipeline data
const allResults = ref<SearchResultItem[]>([])

if (pipelinesData.value?.[0]?.meta?.body) {
  const csvData = pipelinesData.value[0].meta.body as PipelineRawData[]
  allResults.value = csvData.map(transformPipelineData)
}

// ============================================================================
// Search State
// ============================================================================

const searchTerm = ref('')
const selectedCategory = ref('pipelines')
const filteredResults = ref<SearchResultItem[]>([])

// ============================================================================
// Computed Properties
// ============================================================================

const hasResults = computed(() => filteredResults.value.length > 0)
const showNoResults = computed(() => searchTerm.value && !hasResults.value)

// ============================================================================
// Search Logic
// ============================================================================

/**
 * Creates searchable text from all relevant fields of an item
 */
const createSearchableText = (item: SearchResultItem): string => {
  return [
    item.name,
    item.description,
    item.language,
    item.ownership,
    ...(item.keywords || [])
  ].join(' ').toLowerCase()
}

/**
 * Filters items by category
 */
const matchesCategory = (item: SearchResultItem, category: string): boolean => {
  return category === 'all' || item.category.toLowerCase() === category
}

/**
 * Handles search input from the Search component
 */
const handleSearch = (query: string, category: string) => {
  searchTerm.value = query
  selectedCategory.value = category
  
  if (!query) {
    filteredResults.value = []
    return
  }
  
  const lowerQuery = query.toLowerCase()
  
  filteredResults.value = allResults.value.filter(item => {
    return matchesCategory(item, category) && 
           createSearchableText(item).includes(lowerQuery)
  })
}
</script>

<style scoped>
/* ============================================================================
   Layout
   ============================================================================ */

.nexus-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.results-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
  min-height: 400px;
  flex: 1;
}

.results-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

/* ============================================================================
   No Results State
   ============================================================================ */

.no-results {
  text-align: center;
  padding: 4rem 2rem;
  color: var(--color-text-secondary);
}

.no-results svg {
  opacity: 0.3;
  margin-bottom: 1.5rem;
}

.no-results h2 {
  color: var(--color-text);
  font-size: 1.75rem;
  margin: 0 0 0.5rem 0;
}

.no-results p {
  font-size: 1.125rem;
  margin: 0;
}

/* ============================================================================
   Responsive Design
   ============================================================================ */

@media (max-width: 768px) {
  .results-container {
    padding: 1.5rem 1rem;
  }
  
  .results-grid {
    gap: 1rem;
  }
}
</style>