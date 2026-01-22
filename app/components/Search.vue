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

<style scoped>
.search-container {
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
}

.search-form {
  width: 100%;
}

.search-wrapper {
  display: flex;
  position: relative;
  background-color: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: 0.75rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.search-wrapper:focus-within {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
}

/* Category Button */
.category-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 1.25rem;
  background-color: var(--color-bg-secondary);
  color: var(--color-text-secondary);
  border: none;
  border-right: 1px solid var(--color-border);
  border-radius: 0.75rem 0 0 0.75rem;
  font-weight: 500;
  font-size: 1rem;
  white-space: nowrap;
  cursor: pointer;
  transition: all 0.2s ease;
}

.category-button:hover {
  background-color: var(--color-bg);
  color: var(--color-text);
}

.category-button:focus {
  outline: none;
}

.category-label {
  font-size: 1rem;
}

.icon-grid,
.icon-chevron {
  width: 1.125rem;
  height: 1.125rem;
  flex-shrink: 0;
}

/* Dropdown Menu */
.dropdown-menu {
  position: absolute;
  top: calc(100% + 0.5rem);
  left: 0;
  z-index: 50;
  background-color: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: 0.5rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  min-width: 12rem;
}

.dropdown-list {
  padding: 0.5rem;
  list-style: none;
  margin: 0;
}

.dropdown-item {
  display: block;
  width: 100%;
  padding: 0.75rem 1rem;
  text-align: left;
  background: none;
  border: none;
  color: var(--color-text);
  font-size: 1rem;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.dropdown-item:hover {
  background-color: var(--color-bg-secondary);
  color: var(--color-primary);
}

/* Search Input */
.search-input {
  flex: 1;
  padding: 1rem 1.25rem;
  background-color: transparent;
  border: none;
  color: var(--color-text);
  font-size: 1.0625rem;
  outline: none;
}

.search-input::placeholder {
  color: var(--color-text-secondary);
}

/* Search Button */
.search-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  background-color: var(--color-primary);
  color: white;
  border: none;
  border-radius: 0 0.75rem 0.75rem 0;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.search-button:hover {
  background-color: var(--color-primary-hover);
}

.search-button:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.3);
}

.icon-search {
  width: 1.25rem;
  height: 1.25rem;
  flex-shrink: 0;
}

/* Screen reader only */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

/* Responsive Styles */
@media (max-width: 768px) {
  .search-container {
    padding: 1.5rem 1rem;
  }

  .search-wrapper {
    flex-direction: column;
  }

  .category-button {
    border-right: none;
    border-bottom: 1px solid var(--color-border);
    padding: 0.875rem 1rem;
    font-size: 0.9375rem;
  }

  .search-input {
    padding: 0.875rem 1rem;
    font-size: 1rem;
  }

  .search-button {
    padding: 0.875rem 1.5rem;
    justify-content: center;
  }

  .search-button span {
    display: none;
  }

  .icon-search {
    width: 1.5rem;
    height: 1.5rem;
  }
}

@media (max-width: 480px) {
  .category-label {
    max-width: 150px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>