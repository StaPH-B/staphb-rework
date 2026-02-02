<template>
  <div class="search-container">
    <form class="search-form" @submit.prevent="handleSearch">
      <div class="search-wrapper">
          <label for="search-dropdown" class="sr-only">Search</label>
          <button @click.stop.prevent="toggleDropdown" type="button" class="category-button">
              <svg class="icon-grid" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.143 4H4.857A.857.857 0 0 0 4 4.857v4.286c0 .473.384.857.857.857h4.286A.857.857 0 0 0 10 9.143V4.857A.857.857 0 0 0 9.143 4Zm10 0h-4.286a.857.857 0 0 0-.857.857v4.286c0 .473.384.857.857.857h4.286A.857.857 0 0 0 20 9.143V4.857A.857.857 0 0 0 19.143 4Zm-10 10H4.857a.857.857 0 0 0-.857.857v4.286c0 .473.384.857.857.857h4.286a.857.857 0 0 0 .857-.857v-4.286A.857.857 0 0 0 9.143 14Zm10 0h-4.286a.857.857 0 0 0-.857.857v4.286c0 .473.384.857.857.857h4.286a.857.857 0 0 0 .857-.857v-4.286a.857.857 0 0 0-.857-.857Z"/></svg>
              <span class="category-label">{{ selectedCategory.label }}</span>
              <svg class="icon-chevron" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 9-7 7-7-7"/></svg>
          </button>
          <div v-if="isOpen" class="dropdown-menu">
              <ul class="dropdown-list">
                  <li v-for="item in items" :key="item.value">
                      <button @click.stop.prevent="selectCategory(item)" type="button" class="dropdown-item">
                          {{ item.label }}
                      </button>
                  </li>
              </ul>
          </div>
          <input 
            v-model="searchTerm"
            type="search" 
            id="search-dropdown" 
            class="search-input" 
            :placeholder="placeholder || 'Search...'" 
            @input="handleInput"
          >
          <button type="submit" class="search-button">
            <svg class="icon-search" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"/></svg>
            <span>Search</span>
          </button>
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

interface DropdownItem {
  label: string
  value: string
}

const props = defineProps<{
  items?: DropdownItem[]
  placeholder?: string
}>()

const emit = defineEmits<{
  search: [query: string, category: string]
}>()

const selectedCategory = ref(props.items?.[0] || { label: 'All categories', value: 'all' })
const isOpen = ref(false)
const searchTerm = ref('')

const selectCategory = (item: DropdownItem) => {
  selectedCategory.value = item
  isOpen.value = false
  emit('search', searchTerm.value, selectedCategory.value.value)
}

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const handleSearch = () => {
  emit('search', searchTerm.value, selectedCategory.value.value)
}

const handleInput = () => {
  emit('search', searchTerm.value, selectedCategory.value.value)
}
</script>