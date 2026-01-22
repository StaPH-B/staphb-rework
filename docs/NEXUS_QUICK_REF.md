# 🚀 Nexus Search Quick Reference

**TL;DR for adding content to StaPH-B Nexus search**

## ⚡ 30-Second Quick Add (Existing Category)

### Add to Pipelines
1. Open `/content/pipelines/piplines.csv`
2. Add row:
   ```csv
   Name,https://url,Description,Language,Owner,"keyword1, keyword2"
   ```
3. Save → Done! ✨

---

## 📋 5-Minute New Category

### Example: Adding "Tools" Category

**1. Create data file:** `/content/tools/tools.csv`
```csv
tool_name,tool_url,tool_description,tool_type,tool_platform,tool_keywords
MyTool,https://github.com/user/tool,Tool description,CLI,Python,"analysis, genomics"
```

**2. Add to dropdown** in `/app/pages/nexus.vue` (line ~72):
```typescript
const searchCategories = [
  { label: 'Pipelines', value: 'pipelines' },
  { label: 'Tools', value: 'tools' }  // ← Add this
]
```

**3. Create interface** in `/app/pages/nexus.vue`:
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

**4. Load data** in `/app/pages/nexus.vue` (after line ~77):
```typescript
const { data: toolsData } = await useAsyncData('tools', async () => {
  return await queryCollection('tools').all()
})
```

**5. Transform data** in `/app/pages/nexus.vue` (after line ~100):
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

**6. Merge results** in `/app/pages/nexus.vue` (line ~105):
```typescript
// Load tools
if (toolsData.value?.[0]?.meta?.body) {
  const csvData = toolsData.value[0].meta.body as ToolRawData[]
  allResults.value.push(...csvData.map(transformToolData))
}
```

---

## 🎯 Field Mapping

### Required Fields (SearchResultItem)
```typescript
{
  name: string         // Display title
  url: string          // Link to resource
  description: string  // Brief description
  category: string     // Category name (match dropdown!)
}
```

### Optional Fields
```typescript
{
  language?: string    // Tech/language/format
  ownership?: string   // Owner/organization/provider
  keywords?: string[]  // Searchable tags
}
```

---

## 📁 File Structure

```
content/
  └── [category-name]/
      └── [category-name].csv    ← Your data here

app/pages/
  └── nexus.vue                  ← Add category logic here

app/components/
  ├── Search.vue                 ← Search input (no changes needed)
  └── SearchResultCard.vue       ← Result display (no changes needed)
```

---

## 🎨 CSV Template

```csv
item_name,item_url,item_description,item_field1,item_field2,item_keywords
"Example Item",https://example.com,"Description here",Value1,Value2,"tag1, tag2, tag3"
```

**Rules:**
- First row = headers
- Wrap fields with commas in quotes
- UTF-8 encoding
- Keywords = comma-separated string

---

## 🔍 Common Patterns

### Pattern: Reuse Existing Fields
```typescript
// Use 'language' field for different purposes
category: 'Tools',
language: rawData.tool_type      // Tool type
// vs
category: 'Trainings',
language: rawData.training_format // Course format
```

### Pattern: Parse Keywords
```typescript
// Handles both formats automatically
keywords: parseKeywords(rawData.keywords)
// "tag1, tag2" → ['tag1', 'tag2']
// ['tag1', 'tag2'] → ['tag1', 'tag2']
```

### Pattern: Safe Defaults
```typescript
name: rawData.field_name || '',  // Empty string if missing
keywords: parseKeywords(rawData.keywords || [])  // Empty array if missing
```

---

## ⚠️ Common Mistakes

| ❌ Wrong | ✅ Correct |
|---------|-----------|
| Missing from `searchCategories` | Add to dropdown array |
| Typo in category name | Match exactly (case-sensitive) |
| Forgot to transform data | Call transform function |
| Missing interface | Define TypeScript type |
| Hardcoded category | Use variable/constant |
| Unquoted CSV commas | Wrap in quotes |

---

## 🐛 Debug Checklist

Search not working?
- [ ] CSV in `/content/[category]/` directory
- [ ] Category in `searchCategories` array
- [ ] Interface defined for raw data
- [ ] Data loaded with `useAsyncData()`
- [ ] Transform function created
- [ ] Data merged into `allResults`
- [ ] No console errors
- [ ] Hard refresh (Ctrl+Shift+R)

---

## 📊 Data Sources

### CSV (Recommended)
```csv
name,url,description
Item,https://link,Text
```

### JSON
```json
[{"name": "Item", "url": "https://link"}]
```

### API
```typescript
const { data } = await useFetch('https://api.example.com')
```

---

## 🎯 Examples

### Minimal Pipeline Entry
```csv
pipeline_name,pipeline_url,pipeline_description,pipeline_language,pipeline_ownership,pipeline_keywords
FastQC,https://github.com/s-andrews/FastQC,Quality control tool,Java,Babraham Institute,"QC, quality"
```

### Full Featured Entry
```csv
pipeline_name,pipeline_url,pipeline_description,pipeline_language,pipeline_ownership,pipeline_keywords
"StaPH-B Toolkit",https://github.com/staphb/toolkit,"Complete bioinformatics toolkit with 100+ tools",Docker,StaPH-B,"toolkit, docker, bioinformatics, genomics, analysis, multiple-tools"
```

---

## 📚 Full Documentation

See [NEXUS_SEARCH_GUIDE.md](NEXUS_SEARCH_GUIDE.md) for:
- Complete architecture explanation
- Advanced customization
- Performance optimization
- Custom search logic
- Weighted/fuzzy search
- Virtual scrolling
- And more!

---

## 🆘 Quick Help

**Can't find results?**
→ Check `createSearchableText()` includes your fields

**Category not showing?**
→ Add to `searchCategories` array

**TypeScript errors?**
→ Define interface for your data type

**CSV not loading?**
→ Check file path and UTF-8 encoding

**Need more examples?**
→ Look at `transformPipelineData()` function

---

**Quick Reference v1.0** | Last Updated: Jan 22, 2026
