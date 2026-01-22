# 📚 StaPH-B Documentation

Developer documentation for the StaPH-B Nexus application.

## 📖 Available Guides

### Nexus Search System

Complete documentation for adding and managing searchable content in the Nexus search interface.

| Document | Purpose | Audience | Reading Time |
|----------|---------|----------|--------------|
| **[NEXUS_SEARCH_GUIDE.md](NEXUS_SEARCH_GUIDE.md)** | Complete implementation guide | Developers | 30 min |
| **[NEXUS_QUICK_REF.md](NEXUS_QUICK_REF.md)** | Quick reference & cheat sheet | All users | 5 min |
| **[NEXUS_DIAGRAMS.md](NEXUS_DIAGRAMS.md)** | Visual architecture diagrams | Visual learners | 10 min |
| **[NEXUS_EXAMPLE.md](NEXUS_EXAMPLE.md)** | Complete working example | New developers | 15 min |

---

## 🚀 Quick Start

**Never worked with Nexus before?** Start here:

1. Follow [NEXUS_EXAMPLE.md](NEXUS_EXAMPLE.md) (complete working example)
2. Read [NEXUS_QUICK_REF.md](NEXUS_QUICK_REF.md) (5 min quick overview)
3. Scan [NEXUS_DIAGRAMS.md](NEXUS_DIAGRAMS.md) (visual architecture)
4. Dive into [NEXUS_SEARCH_GUIDE.md](NEXUS_SEARCH_GUIDE.md) when you need details

**Just need to add content?** 
→ Go straight to [NEXUS_QUICK_REF.md - 30-Second Quick Add](NEXUS_QUICK_REF.md#-30-second-quick-add-existing-category)

**Adding a new category?**
→ Follow [NEXUS_QUICK_REF.md - 5-Minute New Category](NEXUS_QUICK_REF.md#-5-minute-new-category)

---

## 📋 Document Summaries

### [NEXUS_EXAMPLE.md](NEXUS_EXAMPLE.md)

**Complete working example with:**
- Full "Datasets" category implementation
- All code files with exact locations
- Before/after comparisons
- Sample CSV data
- Testing procedures
- Troubleshooting specific to the example
- Expected results and screenshots

**Use when:**
- First time adding a category
- Learning by example
- Want to see complete implementation
- Testing your understanding
- Need a template to copy

### [NEXUS_SEARCH_GUIDE.md](NEXUS_SEARCH_GUIDE.md)

**Comprehensive developer guide covering:**
- System architecture and component structure
- Step-by-step tutorials for adding categories
- Data format requirements (CSV, JSON, API)
- TypeScript interfaces and type safety
- Advanced customization (fuzzy search, weighted search, custom cards)
- Performance optimization for large datasets
- Complete troubleshooting guide
- Best practices and FAQs
- Real-world examples

**Use when:**
- Building a new search category
- Customizing search behavior
- Debugging search issues
- Understanding the complete system
- Looking for advanced features

### [NEXUS_QUICK_REF.md](NEXUS_QUICK_REF.md)

**Condensed quick reference with:**
- 30-second content addition
- 5-minute new category setup
- Copy-paste code snippets
- Common patterns and solutions
- Field mapping tables
- Debug checklists
- Links to full documentation

**Use when:**
- Adding content quickly
- Need a reminder of syntax
- Looking for code to copy
- Checking field requirements
- Quick troubleshooting

### [NEXUS_DIAGRAMS.md](NEXUS_DIAGRAMS.md)

**Visual architecture documentation:**
- System overview diagrams
- Data flow pipeline
- Component interaction maps
- Search algorithm visualization
- File organization structure
- State machine diagrams
- Function reference cards

**Use when:**
- Understanding data flow
- Learning system architecture
- Teaching others about the system
- Planning new features
- Debugging complex issues

---

## 🎯 Common Tasks

### Task: Add a Pipeline

1. Open `/content/pipelines/piplines.csv`
2. Add row with pipeline details
3. Done!

**More info:** [Quick Ref - Quick Add](NEXUS_QUICK_REF.md#-30-second-quick-add-existing-category)

### Task: Create New Category (e.g., "Tools")

**Option 1: Follow complete example**
See [NEXUS_EXAMPLE.md](NEXUS_EXAMPLE.md) for step-by-step "Datasets" implementation

**Option 2: Quick steps**

1. Create `/content/tools/tools.csv` with data
2. Add to `searchCategories` in nexus.vue
3. Define `ToolRawData` interface
4. Load data with `useAsyncData()`
5. Create `transformToolData()` function
6. Merge into `allResults`

**More info:** [Quick Ref - New Category](NEXUS_QUICK_REF.md#-5-minute-new-category) or [Full Guide - Adding Category](NEXUS_SEARCH_GUIDE.md#adding-a-new-category)

### Task: Customize Search Behavior

See [Full Guide - Advanced Customization](NEXUS_SEARCH_GUIDE.md#advanced-customization)

### Task: Improve Search Performance

See [Full Guide - Performance Considerations](NEXUS_SEARCH_GUIDE.md#performance-considerations)

---

## 🗂️ Related Code Files

### Main Implementation
- `/app/pages/nexus.vue` - Main search page
- `/app/components/Search.vue` - Search input component
- `/app/components/SearchResultCard.vue` - Result display component

### Data Sources
- `/content/pipelines/piplines.csv` - Pipeline data
- `/content/trainings/` - Future training data
- `/content/resources/` - Future resource data

### Styles
- `/app/assets/css/search-results.css` - Result card styles
- `/app/assets/css/main.css` - Global design system

---

## 💡 Learning Paths

### Path 1: Content Contributor (Non-Developer)
```
NEXUS_QUICK_REF.md → Add content via CSV
```

### Path 2: New Developer (Learning)
```
NEXUS_EXAMPLE.md → Try it yourself → NEXUS_QUICK_REF.md → Full Guide as needed
```

### Path 3: Experienced Developer
```
NEXUS_DIAGRAMS.md → NEXUS_QUICK_REF.md → Code files
```

### Path 4: System Architect
```
NEXUS_SEARCH_GUIDE.md (Architecture) → NEXUS_DIAGRAMS.md → Advanced sections
```

---

## 🔍 Finding Information

| I want to... | Read this section... |
|--------------|---------------------|
| Add a single item | [Quick Ref - 30-Second Add](NEXUS_QUICK_REF.md#-30-second-quick-add-existing-category) |
| Create a category | [Quick Ref - 5-Minute Category](NEXUS_QUICK_REF.md#-5-minute-new-category) |
| Understand data flow | [Diagrams - Data Flow](NEXUS_DIAGRAMS.md#data-flow-pipeline) |
| See all available fields | [Quick Ref - Field Mapping](NEXUS_QUICK_REF.md#-field-mapping) |
| Fix search not working | [Guide - Troubleshooting](NEXUS_SEARCH_GUIDE.md#troubleshooting) |
| Customize search logic | [Guide - Advanced](NEXUS_SEARCH_GUIDE.md#advanced-customization) |
| Improve performance | [Guide - Performance](NEXUS_SEARCH_GUIDE.md#performance-considerations) |
| View architecture | [Diagrams - System Overview](NEXUS_DIAGRAMS.md#system-overview) |
| CSV format help | [Guide - Data Format](NEXUS_SEARCH_GUIDE.md#data-format-requirements) |
| See examples | [Guide - Examples](NEXUS_SEARCH_GUIDE.md#example-adding-tools-category-complete) |
4 comprehensive guides + 1 index
- **Code Examples:** 70+ snippets
- **Diagrams:** 10+ visual aids
- **Working Examples:** Complete category implementation
## 📊 Documentation Stats

- **Total Pages:** 3 comprehensive guides
- **Code Examples:** 50+ snippets
- **Diagrams:** 10+ visual aids
- **Coverage:** Full search system architecture
- **Maintenance:** Updated with each feature addition

---

## 🤝 Contributing to Documentation

Found an error or want to improve these docs?

1. Check if issue already exists
2. Create clear, descriptive examples
3. Follow existing formatting style
4. Test all code snippets
5. Update table of contents if needed

---

## 📝 Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | Jan 22, 2026 | Initial documentation release |
|  |  | - Complete search guide |
|  |  | - Quick reference |
|  |  | - Architecture diagrams |

---

## 🔗 External Resources

- [Nuxt Content Documentation](https://content.nuxtjs.org/)
- [Vue 3 Composition API](https://vuejs.org/guide/extras/composition-api-faq.html)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [CSV Best Practices](https://frictionlessdata.io/specs/csv-dialect/)

---

## 🆘 Getting Help

1. **Check documentation first** - Answer is likely here
2. **Review code examples** - Working patterns in the guides  
3. **Examine existing implementations** - Look at pipelines category
4. **Debug systematically** - Use the troubleshooting checklists
5. **Ask for help** - With specific error messages and context

---

**Documentation maintained by the StaPH-B Development Team**  
**Last Updated:** January 22, 2026
