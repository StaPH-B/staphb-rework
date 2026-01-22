# Nexus Search Architecture Diagram

## System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        User Interface                            │
│                     (app/pages/nexus.vue)                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌──────────────┐                    ┌──────────────────────┐  │
│  │   Search     │ ──── emits ────→   │  handleSearch()      │  │
│  │  Component   │  (query+category)  │  Filter & Display    │  │
│  └──────────────┘                    └──────────────────────┘  │
│         ↓                                       ↓                │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │              Filtered Results Array                       │  │
│  └──────────────────────────────────────────────────────────┘  │
│         ↓                                                        │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │   Results Grid (v-for)                                    │  │
│  │   ├─ SearchResultCard                                     │  │
│  │   ├─ SearchResultCard                                     │  │
│  │   └─ SearchResultCard                                     │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

## Data Flow Pipeline

```
┌─────────────────────────────────────────────────────────────────┐
│ 1. DATA SOURCES (Static Files)                                  │
└─────────────────────────────────────────────────────────────────┘
                            ↓
        ┌──────────────────┴───────────────────┐
        ↓                                       ↓
┌──────────────────┐                  ┌──────────────────┐
│  Pipelines CSV   │                  │  Trainings CSV   │
│  /content/       │                  │  /content/       │
│   pipelines/     │                  │   trainings/     │
└──────────────────┘                  └──────────────────┘
        ↓                                       ↓
┌─────────────────────────────────────────────────────────────────┐
│ 2. DATA LOADING (useAsyncData + queryCollection)                │
└─────────────────────────────────────────────────────────────────┘
        ↓
┌──────────────────┐                  ┌──────────────────┐
│ pipelinesData    │                  │ trainingsData    │
│ (Raw CSV)        │                  │ (Raw CSV)        │
└──────────────────┘                  └──────────────────┘
        ↓                                       ↓
┌─────────────────────────────────────────────────────────────────┐
│ 3. DATA TRANSFORMATION                                           │
│    transformPipelineData()         transformTrainingData()      │
└─────────────────────────────────────────────────────────────────┘
        ↓                                       ↓
┌──────────────────┐                  ┌──────────────────┐
│ SearchResultItem │                  │ SearchResultItem │
│ (Standardized)   │                  │ (Standardized)   │
└──────────────────┘                  └──────────────────┘
        ↓                                       ↓
        └────────────────┬───────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────────────┐
│ 4. UNIFIED RESULTS ARRAY                                         │
│    allResults = [...pipelines, ...trainings, ...]                │
└─────────────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────────────┐
│ 5. SEARCH & FILTER                                               │
│    • createSearchableText()                                      │
│    • matchesCategory()                                           │
│    • Filter by query                                             │
└─────────────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────────────┐
│ 6. FILTERED RESULTS                                              │
│    filteredResults (displayed to user)                           │
└─────────────────────────────────────────────────────────────────┘
```

## Component Interaction

```
┌─────────────────────────────────────────────────────────────────┐
│                         nexus.vue                                │
│                      (Parent Component)                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  Data: allResults[], filteredResults[]                           │
│  State: searchTerm, selectedCategory                             │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │             Search Component                              │  │
│  │  Props: items, placeholder                                │  │
│  │  Emits: @search(query, category)                          │  │
│  └──────────────────────────────────────────────────────────┘  │
│                            ↓ @search event                       │
│                            ↓                                     │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │           handleSearch(query, category)                   │  │
│  │  1. Set searchTerm & selectedCategory                     │  │
│  │  2. Filter allResults                                     │  │
│  │  3. Update filteredResults                                │  │
│  └──────────────────────────────────────────────────────────┘  │
│                            ↓                                     │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │         v-for="result in filteredResults"                 │  │
│  │                                                            │  │
│  │  ┌────────────────────────────────────────────────────┐  │  │
│  │  │      SearchResultCard Component                     │  │  │
│  │  │  Props: item (SearchResultItem)                     │  │  │
│  │  │  Displays: name, url, description, keywords, etc.   │  │  │
│  │  └────────────────────────────────────────────────────┘  │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

## Search Algorithm Flow

```
User Types → "genomics"
               ↓
    ┌──────────────────────┐
    │  handleSearch()      │
    │  query: "genomics"   │
    │  category: "all"     │
    └──────────────────────┘
               ↓
    ┌──────────────────────────────────────┐
    │  For each item in allResults:        │
    │                                      │
    │  1. matchesCategory(item, "all")    │
    │     → Check if item belongs to      │
    │       selected category             │
    │                                      │
    │  2. createSearchableText(item)      │
    │     → Combine all searchable fields │
    │     → Convert to lowercase          │
    │                                      │
    │  3. Check if "genomics" is in text  │
    │     → item.includes("genomics")     │
    │                                      │
    │  4. If match → Add to results       │
    └──────────────────────────────────────┘
               ↓
    ┌──────────────────────┐
    │  filteredResults[]   │
    │  [match1, match2...] │
    └──────────────────────┘
               ↓
    Display in Results Grid
```

## Adding a New Category - Visual Steps

```
STEP 1: Create Data Source
═══════════════════════════
/content/
  └── tools/
      └── tools.csv
          ├─ Header Row
          └─ Data Rows


STEP 2: Define Interface
═════════════════════════
interface ToolRawData {
  tool_name: string
  tool_url: string
  tool_description: string
  ...
}


STEP 3: Add to Categories Dropdown
═══════════════════════════════════
searchCategories = [
  { label: 'Pipelines', value: 'pipelines' },
  { label: 'Tools', value: 'tools' } ← NEW
]


STEP 4: Load Data
═════════════════
const { data: toolsData } = 
  await useAsyncData('tools', async () => {
    return await queryCollection('tools').all()
  })


STEP 5: Transform Data
══════════════════════
const transformToolData = (raw) => ({
  name: raw.tool_name,
  url: raw.tool_url,
  description: raw.tool_description,
  category: 'Tools',
  ...
})


STEP 6: Merge into Results
═══════════════════════════
allResults.value = [
  ...pipelinesData.map(transformPipelineData),
  ...toolsData.map(transformToolData) ← NEW
]


RESULT: Category Available!
════════════════════════════
Search Dropdown now shows "Tools"
Data is searchable
Results display automatically
```

## SearchResultItem Data Structure

```
┌─────────────────────────────────────────────────────────────┐
│                    SearchResultItem                          │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  name: string          ← Display Title                       │
│  ├─ Required                                                 │
│  └─ Shown in card header                                     │
│                                                               │
│  url: string           ← Resource Link                       │
│  ├─ Required                                                 │
│  └─ Opens in new tab                                         │
│                                                               │
│  description: string   ← Brief Description                   │
│  ├─ Required                                                 │
│  └─ Main card content                                        │
│                                                               │
│  category: string      ← Category Name                       │
│  ├─ Required                                                 │
│  ├─ Must match dropdown value                               │
│  └─ Shown as badge                                           │
│                                                               │
│  language?: string     ← Tech/Language/Format                │
│  ├─ Optional                                                 │
│  └─ Shown with code icon                                     │
│                                                               │
│  ownership?: string    ← Owner/Provider/Org                  │
│  ├─ Optional                                                 │
│  └─ Shown with people icon                                   │
│                                                               │
│  keywords?: string[]   ← Searchable Tags                     │
│  ├─ Optional                                                 │
│  ├─ Array of strings                                         │
│  └─ Shown as tag pills                                       │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

## File Organization

```
staphb-rework/
├── app/
│   ├── pages/
│   │   └── nexus.vue ────────────┐
│   │                              │ Main search page
│   │                              │ • Data loading
│   │                              │ • Transformation
│   │                              │ • Search logic
│   │                              │
│   └── components/               │
│       ├── Search.vue ────────────┤ Search input + dropdown
│       │                          │ • Category selector
│       │                          │ • Text input
│       │                          │ • Emits search events
│       │                          │
│       └── SearchResultCard.vue ──┤ Individual result card
│                                  │ • Displays one result
│                                  │ • Keywords, meta, link
│                                  │
├── content/ ──────────────────────┤ Data sources
│   ├── pipelines/                │
│   │   └── piplines.csv          │ Pipeline data
│   │                              │
│   ├── trainings/                │
│   │   └── trainings.csv         │ Training data (future)
│   │                              │
│   └── [new-category]/           │
│       └── [data-file].csv       │ Your new category
│                                  │
└── docs/ ─────────────────────────┤ Documentation
    ├── NEXUS_SEARCH_GUIDE.md     │ Complete guide
    ├── NEXUS_QUICK_REF.md        │ Quick reference
    └── NEXUS_DIAGRAMS.md         │ This file!
```

## Key Functions Reference

```
┌─────────────────────────────────────────────────────────────┐
│ parseKeywords(keywords: string | string[])                  │
│ ─────────────────────────────────────────────────────────── │
│ Input:  "tag1, tag2, tag3"  OR  ["tag1", "tag2", "tag3"]   │
│ Output: ["tag1", "tag2", "tag3"]                            │
│ Purpose: Normalize keyword format                           │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ transformPipelineData(raw: PipelineRawData)                 │
│ ─────────────────────────────────────────────────────────── │
│ Input:  { pipeline_name: "X", pipeline_url: "Y", ... }     │
│ Output: { name: "X", url: "Y", category: "Pipelines", ...} │
│ Purpose: Convert raw CSV to SearchResultItem                │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ createSearchableText(item: SearchResultItem)                │
│ ─────────────────────────────────────────────────────────── │
│ Input:  SearchResultItem object                             │
│ Output: "name description language keywords..." (lowercase) │
│ Purpose: Create single searchable text from all fields      │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ matchesCategory(item: SearchResultItem, category: string)   │
│ ─────────────────────────────────────────────────────────── │
│ Input:  Item and category filter                            │
│ Output: true/false                                          │
│ Purpose: Check if item belongs to selected category         │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ handleSearch(query: string, category: string)               │
│ ─────────────────────────────────────────────────────────── │
│ Input:  Search query and category from user                 │
│ Output: Updates filteredResults array                       │
│ Purpose: Main search logic - filter and display results     │
└─────────────────────────────────────────────────────────────┘
```

## Responsive States

```
┌──────────────────────────────────────────────────────────┐
│ Initial State (No search yet)                             │
│ ─────────────────────────────────────────────────────────│
│ • Search bar visible                                      │
│ • No results shown                                        │
│ • Waiting for user input                                  │
└──────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────┐
│ Searching State (User typing)                             │
│ ─────────────────────────────────────────────────────────│
│ • Search term populated                                   │
│ • Real-time filtering                                     │
│ • Results update instantly                                │
└──────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────┐
│ Results Found                                             │
│ ─────────────────────────────────────────────────────────│
│ • Results grid visible                                    │
│ • Cards displayed                                         │
│ • All matched items shown                                 │
└──────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────┐
│ No Results Found                                          │
│ ─────────────────────────────────────────────────────────│
│ • Empty state message                                     │
│ • Helpful icon                                            │
│ • Suggestion to adjust search                             │
└──────────────────────────────────────────────────────────┘
```

---

**Visual Guide v1.0** | For developers adding content to Nexus search
