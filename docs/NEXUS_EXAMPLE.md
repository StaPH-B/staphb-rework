# Complete Working Example: Adding "Datasets" Category

This is a complete, working example showing all files and code needed to add a new "Datasets" category to the Nexus search.

## Files to Create/Modify

### 1. Create Data File

**File:** `/content/datasets/datasets.csv`

```csv
dataset_name,dataset_url,dataset_description,dataset_type,dataset_source,dataset_keywords
SARS-CoV-2 Reference Genomes,https://www.ncbi.nlm.nih.gov/datasets/coronavirus/genomes/,Complete SARS-CoV-2 reference genome sequences from NCBI,Reference Genomes,NCBI,"COVID-19, SARS-CoV-2, reference, genomes, viral"
Bacterial Isolate Genome Database,https://www.ncbi.nlm.nih.gov/pathogens/isolates,Curated bacterial pathogen isolate genomes with AMR data,Pathogen Genomes,NCBI Pathogen Detection,"bacteria, pathogens, AMR, isolates, surveillance"
"Public Health England Surveillance Data",https://www.gov.uk/phe,Epidemiological surveillance datasets for public health,Surveillance Data,Public Health England,"epidemiology, surveillance, public health, outbreak"
WHO Disease Outbreak News,https://www.who.int/emergencies/disease-outbreak-news,Global disease outbreak reports and data,Outbreak Reports,World Health Organization,"outbreaks, surveillance, WHO, global health"
```

**Key Points:**
- Header row with consistent naming: `dataset_*`
- URLs properly formatted
- Keywords as comma-separated strings
- Use quotes for fields containing commas

---

### 2. Update nexus.vue - Add Category to Dropdown

**File:** `/app/pages/nexus.vue`

**Location:** Around line 72-76

**Before:**
```typescript
const searchCategories = [
  { label: 'Pipelines', value: 'pipelines' },
  { label: 'Trainings', value: 'trainings' },
  { label: 'Resources', value: 'resources' }
]
```

**After:**
```typescript
const searchCategories = [
  { label: 'Pipelines', value: 'pipelines' },
  { label: 'Trainings', value: 'trainings' },
  { label: 'Resources', value: 'resources' },
  { label: 'Datasets', value: 'datasets' }  // ← ADD THIS LINE
]
```

---

### 3. Update nexus.vue - Define Interface

**File:** `/app/pages/nexus.vue`

**Location:** After `PipelineRawData` interface (around line 61-68)

**Add:**
```typescript
interface DatasetRawData {
  dataset_name: string
  dataset_url: string
  dataset_description: string
  dataset_type: string
  dataset_source: string
  dataset_keywords: string | string[]
}
```

**Complete Interfaces Section Should Look Like:**
```typescript
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

interface DatasetRawData {
  dataset_name: string
  dataset_url: string
  dataset_description: string
  dataset_type: string
  dataset_source: string
  dataset_keywords: string | string[]
}
```

---

### 4. Update nexus.vue - Load Data

**File:** `/app/pages/nexus.vue`

**Location:** After pipelines data loading (around line 77-80)

**Add:**
```typescript
// Load datasets data
const { data: datasetsData } = await useAsyncData('datasets', async () => {
  return await queryCollection('datasets').all()
})
```

**Complete Data Loading Section:**
```typescript
// ============================================================================
// Data Loading
// ============================================================================

const { data: pipelinesData } = await useAsyncData('pipelines', async () => {
  return await queryCollection('pipelines').all()
})

const { data: datasetsData } = await useAsyncData('datasets', async () => {
  return await queryCollection('datasets').all()
})
```

---

### 5. Update nexus.vue - Create Transform Function

**File:** `/app/pages/nexus.vue`

**Location:** After `transformPipelineData` function (around line 97-104)

**Add:**
```typescript
/**
 * Transforms raw dataset data into SearchResultItem format
 */
const transformDatasetData = (rawData: DatasetRawData): SearchResultItem => ({
  name: rawData.dataset_name || '',
  url: rawData.dataset_url || '',
  description: rawData.dataset_description || '',
  category: 'Datasets',
  language: rawData.dataset_type || '',      // Maps 'type' to 'language' field
  ownership: rawData.dataset_source || '',   // Maps 'source' to 'ownership' field
  keywords: parseKeywords(rawData.dataset_keywords)
})
```

**Complete Transformation Section:**
```typescript
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

/**
 * Transforms raw dataset data into SearchResultItem format
 */
const transformDatasetData = (rawData: DatasetRawData): SearchResultItem => ({
  name: rawData.dataset_name || '',
  url: rawData.dataset_url || '',
  description: rawData.dataset_description || '',
  category: 'Datasets',
  language: rawData.dataset_type || '',
  ownership: rawData.dataset_source || '',
  keywords: parseKeywords(rawData.dataset_keywords)
})
```

---

### 6. Update nexus.vue - Merge Data into Results

**File:** `/app/pages/nexus.vue`

**Location:** Around line 106-110

**Before:**
```typescript
// Load and transform all pipeline data
const allResults = ref<SearchResultItem[]>([])

if (pipelinesData.value?.[0]?.meta?.body) {
  const csvData = pipelinesData.value[0].meta.body as PipelineRawData[]
  allResults.value = csvData.map(transformPipelineData)
}
```

**After:**
```typescript
// Load and transform all data
const allResults = ref<SearchResultItem[]>([])

// Load pipelines
if (pipelinesData.value?.[0]?.meta?.body) {
  const csvData = pipelinesData.value[0].meta.body as PipelineRawData[]
  allResults.value.push(...csvData.map(transformPipelineData))
}

// Load datasets
if (datasetsData.value?.[0]?.meta?.body) {
  const csvData = datasetsData.value[0].meta.body as DatasetRawData[]
  allResults.value.push(...csvData.map(transformDatasetData))
}
```

---

## Testing Your Implementation

### 1. Start Development Server

```bash
cd /home/floreknx/Documents/staphb-rework
pnpm run dev
```

### 2. Navigate to Nexus Page

Open: http://localhost:3000/nexus

### 3. Test Category Dropdown

- Click the category dropdown
- Verify "Datasets" appears in the list
- Select "Datasets"

### 4. Test Search

- Select "Datasets" category
- Type "COVID" in search box
- Should see "SARS-CoV-2 Reference Genomes" result

### 5. Test Result Display

- Click on a result card link
- Verify it opens the correct URL in new tab
- Check all metadata displays (type, source, keywords)

### 6. Test Keyword Search

- Search for "surveillance"
- Should return multiple dataset results
- Try other keywords from your CSV

---

## Expected Results

### Dropdown Should Show:
```
┌─────────────────┐
│ Pipelines       │
│ Trainings       │
│ Resources       │
│ Datasets    ✓   │ ← Your new category
└─────────────────┘
```

### Search Results Should Display:

```
┌──────────────────────────────────────────────────────┐
│ SARS-CoV-2 Reference Genomes            [Datasets]   │
│ ─────────────────────────────────────────────────── │
│ Complete SARS-CoV-2 reference genome sequences      │
│ from NCBI                                            │
│                                                      │
│ 📝 Reference Genomes    👥 NCBI                     │
│                                                      │
│ [COVID-19] [SARS-CoV-2] [reference] [genomes]...    │
└──────────────────────────────────────────────────────┘
```

---

## Troubleshooting

### Problem: Category doesn't appear in dropdown

**Check:**
```typescript
// Verify this line was added:
{ label: 'Datasets', value: 'datasets' }
```

**Solution:** Make sure spelling is exact and comma is present

---

### Problem: No results appear

**Check:**
1. CSV file is in correct location: `/content/datasets/datasets.csv`
2. CSV has proper headers with no typos
3. Data loading code is present
4. Transform function is called

**Debug:**
```typescript
// Add temporary logging in nexus.vue:
console.log('Datasets loaded:', datasetsData.value)
console.log('All results:', allResults.value)
```

---

### Problem: TypeScript errors

**Check:**
```typescript
// Interface must match CSV headers:
interface DatasetRawData {
  dataset_name: string          // ← Matches "dataset_name" in CSV
  dataset_url: string           // ← Matches "dataset_url" in CSV
  dataset_description: string   // ← etc.
  ...
}
```

**Solution:** Ensure interface field names exactly match CSV headers

---

### Problem: Keywords don't work

**Check:**
```typescript
// Verify parseKeywords is called:
keywords: parseKeywords(rawData.dataset_keywords)
```

**CSV Format:**
```csv
# Good - comma-separated in quotes:
"keyword1, keyword2, keyword3"

# Bad - no quotes with commas:
keyword1, keyword2, keyword3  ← Will break CSV parsing
```

---

## File Structure After Implementation

```
staphb-rework/
├── content/
│   ├── pipelines/
│   │   └── piplines.csv
│   └── datasets/               ← NEW FOLDER
│       └── datasets.csv        ← NEW FILE
│
└── app/
    └── pages/
        └── nexus.vue           ← MODIFIED (6 sections updated)
```

---

## Commit Message Template

```
feat: Add Datasets category to Nexus search

- Created datasets.csv with 4 initial datasets
- Added DatasetRawData interface
- Implemented transformDatasetData function
- Added datasets to search categories dropdown
- Tested search functionality

Datasets now searchable by name, description, type, source, and keywords.
```

---

## Next Steps

After implementing this example:

1. **Add more datasets** to `/content/datasets/datasets.csv`
2. **Customize field labels** if needed (e.g., "Type" instead of "Language")
3. **Add more categories** using the same pattern
4. **Implement advanced features** from the main guide

---

## Summary

You've successfully added a new category by:

✅ Creating a data file (CSV)  
✅ Adding category to dropdown  
✅ Defining TypeScript interface  
✅ Loading data with useAsyncData  
✅ Creating transform function  
✅ Merging into search results  

This same pattern works for any category: Tools, Documentation, Publications, etc.

---

**Example Last Updated:** January 22, 2026  
**Tested With:** Nuxt 3, Vue 3, TypeScript
