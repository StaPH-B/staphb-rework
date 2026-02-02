# CSS Architecture

This directory contains a harmonized, maintainable CSS design system for the entire application.

## 📁 File Structure

```
app/assets/css/
├── main.css                 ⭐ Core design system & global styles
├── features-cards.css       🎴 Feature card component
├── hero-section.css         🦸 Hero/banner section component
├── content-cards.css        🎯 Reusable content card component
├── project-cards.css        📦 Project showcase cards
├── search-results.css       🔍 Search result displays
├── THEME_GUIDE.md          📖 Complete theming documentation
├── DESIGN_TOKENS.css       📝 Quick reference (not imported)
└── README.md               📚 This file
```

## 🚀 Quick Start

### To Change the Site's Color Theme:

1. Open [main.css](main.css)
2. Find the `:root` section (lines 1-20)
3. Update the `--theme-primary` variables:

```css
:root {
    --theme-primary: #YOUR_COLOR;          /* Main brand color */
    --theme-primary-dark: #DARKER_VARIANT; /* Hover states */
    --theme-primary-light: #LIGHTER;       /* Dark mode */
    --theme-primary-lighter: #LIGHTEST;    /* Dark mode hover */
}
```

4. Save and refresh - all components update automatically! ✨

## 🎨 Design System Overview

### Three-Layer Architecture

```
┌─────────────────────────────────────┐
│  Theme Colors (--theme-*)           │  ← Change these to restyle everything
│  Raw color values                   │
└────────────┬────────────────────────┘
             │
             ↓
┌─────────────────────────────────────┐
│  Semantic Colors (--color-*)        │  ← Auto-adapt to light/dark mode
│  Context-aware variables            │
└────────────┬────────────────────────┘
             │
             ↓
┌─────────────────────────────────────┐
│  Component Styles                   │  ← Use semantic variables
│  features-cards.css, etc.           │
└─────────────────────────────────────┘
```

### Benefits:
- ✅ Change entire theme by updating 4 color values
- ✅ Automatic dark mode support
- ✅ Consistent spacing, shadows, and transitions
- ✅ No hardcoded values in components
- ✅ Maintainable and scalable

## 📚 Documentation

### For Theme Customization
Read [THEME_GUIDE.md](THEME_GUIDE.md) - Comprehensive guide with:
- Complete color reference
- Usage examples
- Quick theme templates (purple, green, monochrome, etc.)
- Best practices
- Dark mode explanation

### For Development
Check [DESIGN_TOKENS.css](DESIGN_TOKENS.css) - Quick reference showing:
- All available CSS variables
- Usage examples for common patterns
- Copy-paste-ready code snippets

## 🎯 Key Features

### 🌓 Dark Mode
- **Automatic**: Detects OS preference via `prefers-color-scheme`
- **Manual**: Add `.dark-mode` or `.light-mode` class to override
- **Zero extra code**: All components adapt automatically

### 🎨 Design Tokens

#### Colors
```css
/* Backgrounds */
--color-bg-primary, --color-bg-secondary, --color-bg-tertiary

/* Text */
--color-text-primary, --color-text-secondary, --color-text-inverse

/* Interactive */
--color-primary, --color-primary-hover

/* Cards */
--color-card-bg, --color-card-border
```

#### Spacing
```css
--space-xs (8px)  → --space-sm (16px)  → --space-md (24px)
--space-lg (32px) → --space-xl (48px)  → --space-2xl (80px)
```

#### Shadows
```css
--shadow-sm → --shadow-md → --shadow-lg → --shadow-xl
```

#### Border Radius
```css
--radius-sm (inputs) → --radius-md (buttons) → --radius-lg (cards)
```

#### Transitions
```css
--transition-fast (0.15s) → --transition-normal (0.3s) → --transition-slow (0.5s)
```

## 🏗️ Component Files

All component files follow consistent patterns:

### Standard Component Structure
```css
/* Section header with component name */

.component-name {
  /* Uses semantic variables */
  background: var(--color-bg-primary);
  color: var(--color-text-primary);
  padding: var(--space-lg);
  border-radius: var(--radius-lg);
  transition: all var(--transition-normal);
}

.component-name:hover {
  /* Consistent hover effects */
  box-shadow: var(--shadow-lg);
  transform: translateY(-2px);
}

/* Responsive breakpoint at 768px */
@media (max-width: 768px) {
  /* Mobile adjustments */
}
```

### Component Inventory

| File | Purpose | Key Classes |
|------|---------|-------------|
| **main.css** | Design system core | `:root`, utilities |
| **features-cards.css** | Feature highlights | `.feature-card`, `.features-grid` |
| **hero-section.css** | Page headers/banners | `.hero-section`, `.hero-title` |
| **content-cards.css** | Reusable content layouts | `.content-item`, `.content-card-text` |
| **project-cards.css** | Project showcases | `.project-card`, `.project-header` |
| **search-results.css** | Search UI | `.result-card`, `.result-card-tag` |

## ✅ Best Practices

### Do ✓
- Use semantic CSS variables (`var(--color-primary)`)
- Use spacing scale (`var(--space-md)`)
- Use design tokens for shadows, radius, transitions
- Test both light and dark modes
- Add comments to explain complex styles
- Follow mobile-first responsive design

### Don't ✗
- Hardcode colors (`#007bff`, `rgb(0,123,255)`)
- Hardcode spacing (`15px`, `2.3rem`)
- Hardcode transitions (`0.2s`, `300ms`)
- Create component-specific color variables
- Override semantic colors in components
- Use inline styles

## 🔧 How Components Connect

```css
/* main.css defines: */
:root {
    --theme-primary: #007bff;           /* Your brand color */
    --color-primary: var(--theme-primary); /* Semantic reference */
}

/* hero-section.css uses: */
.hero-section {
    background: var(--color-primary);   /* Uses semantic variable */
}

/* Result: Change --theme-primary once, update everywhere! */
```

## 🎨 Example Theme Changes

### Purple Theme
```css
--theme-primary: #6f42c1;
--theme-primary-dark: #5a32a3;
--theme-primary-light: #9370db;
--theme-primary-lighter: #b19cd9;
```

### Green Theme
```css
--theme-primary: #28a745;
--theme-primary-dark: #1e7e34;
--theme-primary-light: #5cb85c;
--theme-primary-lighter: #7bc87f;
```

### Ocean Theme
```css
--theme-primary: #0077be;
--theme-primary-dark: #005a8e;
--theme-primary-light: #4da3d8;
--theme-primary-lighter: #80bde6;
```

## 🧪 Testing Your Changes

1. **Check Light Mode**: Default browser view
2. **Check Dark Mode**: 
   - OS: Change system preferences
   - Manual: Add `class="dark-mode"` to `<html>` tag
3. **Test Responsive**: Resize browser to mobile width
4. **Verify Consistency**: All components should update with theme changes

## 📖 Learn More

- [CSS Custom Properties (MDN)](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)
- [prefers-color-scheme](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme)
- [Design Tokens](https://css-tricks.com/what-are-design-tokens/)

## 🆘 Troubleshooting

### Colors not changing?
- Verify you're editing the `:root` section in main.css
- Check browser cache (hard refresh: Ctrl+Shift+R)
- Ensure main.css is loaded before component files

### Dark mode not working?
- Check OS dark mode settings
- Try manual override: Add `class="dark-mode"` to HTML
- Verify semantic colors are used (not hardcoded)

### Inconsistent spacing?
- Use spacing scale variables instead of hardcoded values
- Check if component file is importing main.css variables

---

**Built with ❤️ for developer experience and maintainability**
