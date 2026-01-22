# 📚 Nexus Search Developer Guide

Complete guide for adding new content and categories to the StaPH-B Nexus search functionality.

## Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Quick Start](#quick-start)
- [Adding a New Category](#adding-a-new-category)
- [Adding Content to Existing Categories](#adding-content-to-existing-categories)
- [Data Format Requirements](#data-format-requirements)
- [Component Reference](#component-reference)
- [Advanced Customization](#advanced-customization)
- [Troubleshooting](#troubleshooting)

---

## Overview

The Nexus search system is a multi-category search interface that allows users to discover StaPH-B resources including:
- **Pipelines** - Bioinformatics analysis pipelines
- **Trainings** - Educational resources (ready to add)
- **Resources** - General resources (ready to add)

### Key Features
- Real-time search with instant filtering
- Category-based filtering
- Keyword tagging system
- Flexible data sources (CSV, JSON, Markdown)
- Responsive card-based results display

---

## Architecture

### Component Structure

```
app/pages/nexus.vue           ← Main search page (data + logic)
├── app/components/Search.vue      ← Search input + category dropdown
├── app/components/SearchResultCard.vue  ← Individual result display
└── content/                   ← Data sources
    ├── pipelines/
    │   └── piplines.csv      ← Pipeline data (CSV)
    └── [new-category]/       ← Your new categories here
```

### Data Flow

```
1. Data Loading (nexus.vue)
   ↓
2. Data Transformation (parseKeywords, transformPipelineData)
   ↓
3. Search State (searchTerm, selectedCategory)
   ↓
4. Search Logic (handleSearch, createSearchableText)
   ↓
5. Display Results (SearchResultCard)
```

---

## Quick Start

### Adding Content to Pipelines (5 minutes)

1. Open `/content/pipelines/piplines.csv`
2. Add a new row with the required fields:
   ```csv
   pipeline_name,pipeline_url,pipeline_description,pipeline_language,pipeline_ownership,pipeline_keywords
   MyPipeline,https://github.com/user/repo,Analysis pipeline for XYZ,Nextflow,My Organization,"keyword1, keyword2, keyword3"
   ```
3. Save and refresh - your content appears automatically! ✨

---

## Adding a New Category

Follow these steps to add a completely new category (e.g., "Trainings", "Tools", "Datasets").

### Step 1: Create Data Source

#### Option A: CSV File (Recommended for structured data)

Create `/content/trainings/trainings.csv`:
```csv
training_name,training_url,training_description,training_format,training_provider,training_keywords
Introduction to Genomics,https://example.com/course,Learn genomic analysis basics,Online Course,StaPH-B,"genomics, beginner, bioinformatics"
Advanced Phylogenetics,https://example.com/advanced,Deep dive into phylogenetic analysis,Workshop,University of XYZ,"phylogenetics, advanced, trees"
```

#### Option B: JSON File (Better for complex nested data)

Create `/content/trainings/trainings.json`:
```json
[
  {
    "name": "Introduction to Genomics",
    "url": "https://example.com/course",
    "description": "Learn genomic analysis basics",
    "format": "Online Course",
    "provider": "StaPH-B",
    "keywords": ["genomics", "beginner", "bioinformatics"]
  }
]
```

#### Option C: Markdown with Frontmatter

Create `/content/trainings/intro-genomics.md`:
```markdown
---
name: Introduction to Genomics
url: https://example.com/course
format: Online Course
provider: StaPH-B
keywords:
  - genomics
  - beginner
---

Learn genomic analysis basics with hands-on exercises.
```

### Step 2: Add Category to Search Dropdown

Edit `/app/pages/nexus.vue`:

```typescript
// Around line 72-76
const searchCategories = [
  { label: 'Pipelines', value: 'pipelines' },
  { label: 'Trainings', value: 'trainings' },  // ← Add this
  { label: 'Resources', value: 'resources' }
]
```

### Step 3: Define TypeScript Interface

Add interface for your category data structure in `/app/pages/nexus.vue`:

```typescript
// Add after PipelineRawData interface (around line 61)
interface TrainingRawData {
  training_name: string
  training_url: string
  training_description: string
  training_format: string
  training_provider: string
  training_keywords: string | string[]
}
```

### Step 4: Create Data Loader

Add loader in `/app/pages/nexus.vue` (after line 77):

```typescript
// Load trainings data
const { data: trainingsData } = await useAsyncData('trainings', async () => {
  return await queryCollection('trainings').all()
})
```

### Step 5: Create Transformation Function

Add transformer in `/app/pages/nexus.vue`:

```typescript
// Add after transformPipelineData (around line 100)
/**
 * Transforms raw training data into SearchResultItem format
 */
const transformTrainingData = (rawData: TrainingRawData): SearchResultItem => ({
  name: rawData.training_name || '',
  url: rawData.training_url || '',
  description: rawData.training_description || '',
  category: 'Trainings',
  language: rawData.training_format || '',      // Reuse 'language' field for format
  ownership: rawData.training_provider || '',    // Reuse 'ownership' field for provider
  keywords: parseKeywords(rawData.training_keywords)
})
```

### Step 6: Transform and Load Data

Update the `allResults` loading section (around line 105):

```typescript
const allResults = ref<SearchResultItem[]>([])

// Load pipelines
if (pipelinesData.value?.[0]?.meta?.body) {
  const csvData = pipelinesData.value[0].meta.body as PipelineRawData[]
  allResults.value.push(...csvData.map(transformPipelineData))
}

// Load trainings
if (trainingsData.value?.[0]?.meta?.body) {
  const csvData = trainingsData.value[0].meta.body as TrainingRawData[]
  allResults.value.push(...csvData.map(transformTrainingData))
}
```

### Step 7: Update SearchResultCard Labels (Optional)

If you want custom field labels for different categories, edit `/app/components/SearchResultCard.vue`:

```vue
<div v-if="item.language" class="result-card-meta">
  <svg class="icon-code">...</svg>
  <span>{{ getLabelForLanguage(item) }}</span>
</div>

<script>
const getLabelForLanguage = (item) => {
  // For trainings, 'language' field contains 'format'
  return item.language
}
</script>
```

---

## Adding Content to Existing Categories

### Method 1: Direct CSV Edit

For **Pipelines**, edit `/content/pipelines/piplines.csv`:

```csv
pipeline_name,pipeline_url,pipeline_description,pipeline_language,pipeline_ownership,pipeline_keywords
NewPipeline,https://github.com/org/new,Pipeline description here,Nextflow,Organization Name,"keyword1, keyword2, keyword3"
```

**Field Requirements:**
- `pipeline_name` *(required)* - Display name
- `pipeline_url` *(required)* - Link to resource
- `pipeline_description` *(required)* - Brief description
- `pipeline_language` *(optional)* - Programming language/technology
- `pipeline_ownership` *(optional)* - Organization or owner
- `pipeline_keywords` *(optional)* - Comma-separated keywords for search

### Method 2: Programmatic Addition

For dynamic content, you can fetch from external APIs:

```typescript
// In nexus.vue
const { data: externalData } = await useFetch('https://api.example.com/pipelines')

if (externalData.value) {
  const transformed = externalData.value.map(item => ({
    name: item.title,
    url: item.html_url,
    description: item.description,
    category: 'Pipelines',
    language: item.language,
    ownership: item.owner,
    keywords: item.topics || []
  }))
  allResults.value.push(...transformed)
}
```

---

## Data Format Requirements

### CSV Format

**Headers:** First row must contain field names
**Encoding:** UTF-8
**Line endings:** Unix (LF) or Windows (CRLF)
**Quotes:** Use quotes for fields containing commas

Example:
```csv
name,url,description,keywords
"Item 1",https://example.com,"Description with, comma","tag1, tag2"
Item 2,https://example2.com,Simple description,single-tag
```

### Keyword Formatting

Keywords can be:
- **String:** `"keyword1, keyword2, keyword3"`
- **Array:** `["keyword1", "keyword2", "keyword3"]` (JSON only)

The `parseKeywords()` function handles both automatically.

---

## Component Reference

### SearchResultItem Interface

All search results must conform to this interface:

```typescript
interface SearchResultItem {
  name: string           // ← REQUIRED: Display title
  url: string            // ← REQUIRED: Link to resource
  description: string    // ← REQUIRED: Brief description
  category: string       // ← REQUIRED: Category name (matches dropdown)
  language?: string      // ← OPTIONAL: Language/format/type
  ownership?: string     // ← OPTIONAL: Owner/provider/organization
  keywords?: string[]    // ← OPTIONAL: Searchable keywords
}
```

### Search.vue Props

```typescript
interface Props {
  items?: DropdownItem[]     // Category options for dropdown
  placeholder?: string       // Search input placeholder text
}

// Emits
emit('search', query: string, category: string)
```

### SearchResultCard.vue Props

```typescript
interface Props {
  item: SearchResultItem     // Result data to display
}
```

---

## Advanced Customization

### Custom Search Logic

Modify `createSearchableText()` in `/app/pages/nexus.vue` to customize what fields are searchable:

```typescript
const createSearchableText = (item: SearchResultItem): string => {
  // Add custom fields to search
  return [
    item.name,
    item.description,
    item.language,
    item.ownership,
    item.customField,           // ← Your custom field
    ...(item.keywords || [])
  ].join(' ').toLowerCase()
}
```

### Weighted Search

Prioritize certain fields:

```typescript
const searchScore = (item: SearchResultItem, query: string): number => {
  let score = 0
  const lowerQuery = query.toLowerCase()
  
  // Name match = highest priority
  if (item.name.toLowerCase().includes(lowerQuery)) score += 10
  
  // Keyword match = medium priority
  if (item.keywords?.some(k => k.toLowerCase().includes(lowerQuery))) score += 5
  
  // Description match = low priority
  if (item.description.toLowerCase().includes(lowerQuery)) score += 1
  
  return score
}

// Sort by score
filteredResults.value = results
  .map(item => ({ item, score: searchScore(item, query) }))
  .filter(({ score }) => score > 0)
  .sort((a, b) => b.score - a.score)
  .map(({ item }) => item)
```

### Custom Result Card Layout

Create a category-specific card component:

```vue
<!-- app/components/TrainingResultCard.vue -->
<template>
  <div class="training-card">
    <div class="training-header">
      <h3>{{ item.name }}</h3>
      <span class="duration">{{ item.duration }}</span>
    </div>
    <p>{{ item.description }}</p>
    <div class="training-meta">
      <span class="format">{{ item.format }}</span>
      <span class="level">{{ item.level }}</span>
    </div>
  </div>
</template>
```

Then conditionally render in `nexus.vue`:

```vue
<component 
  :is="getCardComponent(result.category)"
  :key="result.url"
  :item="result"
/>

<script>
const getCardComponent = (category: string) => {
  const components = {
    'Trainings': TrainingResultCard,
    'Pipelines': SearchResultCard,
    // default
  }
  return components[category] || SearchResultCard
}
</script>
```

### Fuzzy Search

Install fuzzy search library:
```bash
pnpm add fuse.js
```

Implement in `nexus.vue`:
```typescript
import Fuse from 'fuse.js'

const fuse = new Fuse(allResults.value, {
  keys: ['name', 'description', 'keywords'],
  threshold: 0.3,
  includeScore: true
})

const fuzzySearch = (query: string) => {
  const results = fuse.search(query)
  return results.map(r => r.item)
}
```

---

## Example: Adding "Tools" Category (Complete)

Here's a complete example of adding a new "Tools" category:

### 1. Create Data File

`/content/tools/tools.csv`:
```csv
tool_name,tool_url,tool_description,tool_type,tool_platform,tool_keywords
FastQC,https://github.com/s-andrews/FastQC,Quality control for sequencing data,Quality Control,Java/Command Line,"QC, FASTQ, Quality"
SAMtools,https://github.com/samtools/samtools,Utilities for SAM/BAM file manipulation,File Processing,C/Command Line,"SAM, BAM, Alignment"
```

### 2. Update Category Dropdown

In `/app/pages/nexus.vue`:
```typescript
const searchCategories = [
  { label: 'Pipelines', value: 'pipelines' },
  { label: 'Trainings', value: 'trainings' },
  { label: 'Resources', value: 'resources' },
  { label: 'Tools', value: 'tools' }         // ← Add
]
```

### 3. Add Interface

```typescript
interface ToolRawData {
  tool_name: string
  tool_url: string
  tool_description: string
  tool_type: string
  tool_platform: string
  tool_keywords: string | string[]
}
```

### 4. Load Data

```typescript
const { data: toolsData } = await useAsyncData('tools', async () => {
  return await queryCollection('tools').all()
})
```

### 5. Transform Data

```typescript
const transformToolData = (rawData: ToolRawData): SearchResultItem => ({
  name: rawData.tool_name || '',
  url: rawData.tool_url || '',
  description: rawData.tool_description || '',
  category: 'Tools',
  language: rawData.tool_type || '',
  ownership: rawData.tool_platform || '',
  keywords: parseKeywords(rawData.tool_keywords)
})
```

### 6. Merge into Results

```typescript
// Load tools
if (toolsData.value?.[0]?.meta?.body) {
  const csvData = toolsData.value[0].meta.body as ToolRawData[]
  allResults.value.push(...csvData.map(transformToolData))
}
```

Done! Your Tools category is now searchable.

---

## Troubleshooting

### Problem: New content doesn't appear

**Solutions:**
1. Check CSV formatting (proper headers, no syntax errors)
2. Clear Nuxt cache: `rm -rf .nuxt` and rebuild
3. Verify file is in correct `/content/[category]/` directory
4. Check browser console for errors
5. Ensure data transformation function is called

### Problem: Search not finding results

**Solutions:**
1. Verify `createSearchableText()` includes your fields
2. Check that keywords are properly parsed
3. Test search query matches field content
4. Ensure category filter is correct
5. Check for case sensitivity issues

### Problem: Category not showing in dropdown

**Solutions:**
1. Verify `searchCategories` array includes your category
2. Check spelling matches exactly (case-sensitive)
3. Ensure Search component receives updated items prop

### Problem: TypeScript errors

**Solutions:**
1. Define proper interface for your data structure
2. Ensure all required SearchResultItem fields are provided
3. Use optional chaining for nullable fields: `rawData?.field || ''`
4. Run `pnpm run typecheck` to see all errors

### Problem: CSV parsing errors

**Solutions:**
1. Ensure UTF-8 encoding
2. Wrap fields with commas in quotes: `"field, with, commas"`
3. Escape quotes in content: `"He said ""hello"""`
4. Check for extra/missing columns
5. Verify no trailing commas

---

## Best Practices

### ✅ DO

- Use consistent naming conventions for fields (e.g., `category_name`, `category_url`)
- Provide meaningful keywords for better searchability
- Keep descriptions concise (100-200 characters ideal)
- Test search with various queries
- Use semantic field names in transformers
- Add TypeScript types for all data structures
- Document custom fields in comments

### ❌ DON'T

- Hardcode category names (use variables)
- Mix data formats in a single category
- Omit required fields (name, url, description)
- Use special characters in CSV without quoting
- Forget to update the category dropdown
- Skip data transformation step
- Leave console.log statements in production

---

## Performance Considerations

### Large Datasets (1000+ items)

1. **Implement Pagination:**
```typescript
const pageSize = 50
const currentPage = ref(1)
const paginatedResults = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return filteredResults.value.slice(start, start + pageSize)
})
```

2. **Debounce Search Input:**
```typescript
import { debounce } from 'lodash-es'

const debouncedSearch = debounce((query, category) => {
  handleSearch(query, category)
}, 300)
```

3. **Virtual Scrolling:**
```bash
pnpm add vue-virtual-scroller
```

---

## Testing Your Changes

### Manual Testing Checklist

- [ ] Category appears in dropdown
- [ ] All items load without errors
- [ ] Search returns correct results
- [ ] Keywords are searchable
- [ ] Result cards display properly
- [ ] Links work correctly
- [ ] Mobile responsive
- [ ] No console errors
- [ ] Dark mode compatible

### Test Data

Create test entries to verify:
```csv
Test Item 1,https://test.com,Short description,Type,Owner,"test, keyword"
Test Item 2 with long name that wraps,https://test2.com,Much longer description to test card layout and text wrapping behavior,Different Type,Different Owner,"multiple, test, keywords, here"
```

---

## FAQ

**Q: Can I use multiple data sources for one category?**  
A: Yes! Load multiple files and merge them:
```typescript
const source1Data = await queryCollection('pipelines').all()
const source2Data = await queryCollection('pipelines-extra').all()
// Merge arrays before transforming
```

**Q: How do I change the order of categories in the dropdown?**  
A: Reorder items in the `searchCategories` array.

**Q: Can I make a category private/hidden?**  
A: Yes, simply don't add it to `searchCategories`. Data can still be loaded programmatically.

**Q: What's the maximum number of items?**  
A: No hard limit, but consider pagination above 500 items for performance.

**Q: Can I integrate external APIs?**  
A: Yes! Use `useFetch()` or `useAsyncData()` to fetch from any API endpoint.

---

## Resources

- [Nuxt Content Documentation](https://content.nuxtjs.org/)
- [Vue 3 Documentation](https://vuejs.org/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [CSV Best Practices](https://frictionlessdata.io/specs/csv-dialect/)

---

## Need Help?

- Check existing categories (Pipelines) as reference implementation
- Review component source code with detailed comments
- Test with minimal example first before adding full dataset
- Use TypeScript error messages as debugging guides

---

**Last Updated:** January 22, 2026  
**Version:** 1.0.0  
**Maintainer:** StaPH-B Development Team
