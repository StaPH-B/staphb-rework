# 🎨 Theme Customization Guide

This guide explains how to customize the color theme of your application. All theming is centralized in [main.css](main.css) for easy maintenance and consistency.

## Quick Start: Changing Colors

All theme colors are defined at the top of `main.css`. To change your site's color scheme, simply modify the values in the `:root` section:

```css
:root {
    /* ===== THEME COLORS (Easy to customize!) ===== */
    /* Primary Brand Color */
    --theme-primary: #007bff;        /* Your main brand color */
    --theme-primary-dark: #0056b3;   /* Darker variant for hover states */
    --theme-primary-light: #4da3ff;  /* Lighter variant (used in dark mode) */
    --theme-primary-lighter: #80bdff; /* Even lighter (used for dark mode hovers) */
    
    /* Accent Colors (optional secondary palette) */
    --theme-accent: #28a745;
    --theme-accent-dark: #1e7e34;
}
```

## 🎯 Color System Architecture

### Three-Tier System

1. **Theme Colors** (`--theme-*`): Raw color values that define your brand
2. **Semantic Colors** (`--color-*`): Context-aware variables that reference theme colors
3. **Component Usage**: CSS classes use semantic colors for flexibility

This separation allows you to change the entire theme by updating just the theme colors.

### Example Color Flow

```
--theme-primary (#007bff) 
    ↓
--color-primary (references --theme-primary)
    ↓
.hero-section { background: var(--color-primary); }
```

## 🌈 Complete Color Reference

### Theme Colors (Customize these!)

| Variable | Purpose | Default |
|----------|---------|---------|
| `--theme-primary` | Main brand color | `#007bff` |
| `--theme-primary-dark` | Hover/active states | `#0056b3` |
| `--theme-primary-light` | Dark mode primary | `#4da3ff` |
| `--theme-primary-lighter` | Dark mode hover | `#80bdff` |
| `--theme-accent` | Secondary brand color | `#28a745` |
| `--theme-accent-dark` | Accent hover state | `#1e7e34` |

### Gray Scale

| Variable | Use Case | Light | Dark |
|----------|----------|-------|------|
| `--theme-gray-50` | Subtle backgrounds | `#f8f9fa` | - |
| `--theme-gray-100` | Borders, dividers | `#e9ecef` | - |
| `--theme-gray-500` | Secondary text | `#6c757d` | - |
| `--theme-gray-900` | Dark backgrounds | `#1a1a1a` | Primary bg |

### Semantic Colors (Auto-adapt to light/dark mode)

#### Backgrounds
```css
--color-bg-primary      /* Main page background */
--color-bg-secondary    /* Section backgrounds */
--color-bg-tertiary     /* Nested backgrounds */
```

#### Text
```css
--color-text-primary    /* Main body text */
--color-text-secondary  /* Less important text */
--color-text-tertiary   /* Muted text */
--color-text-inverse    /* Text on colored backgrounds */
```

#### Borders
```css
--color-border-primary   /* Default borders */
--color-border-secondary /* Subtle borders */
--color-border-light     /* Very subtle borders */
```

#### Interactive
```css
--color-primary          /* Buttons, links, accents */
--color-primary-hover    /* Hover states */
--color-primary-active   /* Active/pressed states */
```

#### Cards & Components
```css
--color-card-bg          /* Card backgrounds */
--color-card-border      /* Card borders */
--color-card-shadow      /* Card shadows */
--color-card-shadow-hover /* Hover shadow */
```

## 🎨 Design Tokens

### Shadows
```css
--shadow-sm    /* Subtle elevation (2px) */
--shadow-md    /* Medium elevation (4px) */
--shadow-lg    /* High elevation (10px) */
--shadow-xl    /* Maximum elevation (15px) */
```

### Border Radius
```css
--radius-sm    /* 0.375rem - Inputs, small elements */
--radius-md    /* 0.5rem - Buttons */
--radius-lg    /* 0.75rem - Cards */
--radius-xl    /* 1rem - Large cards */
--radius-full  /* 9999px - Pills, badges */
```

### Spacing Scale
```css
--space-xs    /* 0.5rem  (8px) */
--space-sm    /* 1rem    (16px) */
--space-md    /* 1.5rem  (24px) */
--space-lg    /* 2rem    (32px) */
--space-xl    /* 3rem    (48px) */
--space-2xl   /* 5rem    (80px) */
```

### Transitions
```css
--transition-fast    /* 0.15s - Subtle interactions */
--transition-normal  /* 0.3s - Standard animations */
--transition-slow    /* 0.5s - Dramatic effects */
```

## 🌓 Dark Mode

Dark mode is automatic! The system:
1. Detects user's OS preference via `prefers-color-scheme`
2. Automatically adjusts semantic colors
3. Can be manually overridden with `.dark-mode` or `.light-mode` classes

### Semantic colors automatically adapt:
- Backgrounds: Light → Dark
- Text: Dark → Light  
- Borders: Subtle adjustments
- Primary colors: Lighter shades for dark mode

## 📝 Usage Examples

### Example 1: Change to Purple Theme
```css
:root {
    --theme-primary: #6f42c1;
    --theme-primary-dark: #5a32a3;
    --theme-primary-light: #9370db;
    --theme-primary-lighter: #b19cd9;
}
```

### Example 2: Green Theme
```css
:root {
    --theme-primary: #28a745;
    --theme-primary-dark: #1e7e34;
    --theme-primary-light: #5cb85c;
    --theme-primary-lighter: #7bc87f;
}
```

### Example 3: Add a New Component Color
```css
/* In :root */
--color-warning: #ffc107;
--color-warning-dark: #e0a800;

/* Use in component */
.alert-warning {
    background: var(--color-warning);
    border-color: var(--color-warning-dark);
}
```

## 🎯 Best Practices

### ✅ DO
- Use semantic variables (`--color-primary`) in components
- Update theme colors to change the overall look
- Test both light and dark modes
- Use the spacing scale for consistency
- Leverage design tokens (shadows, radius, transitions)

### ❌ DON'T
- Hardcode colors in component files
- Mix hardcoded values with CSS variables
- Create component-specific color variables
- Override semantic colors in components

## 🔧 Component Files

All component CSS files use the centralized design system:

- [features-cards.css](features-cards.css) - Feature card components
- [hero-section.css](hero-section.css) - Hero/banner sections
- [mission-cards.css](mission-cards.css) - Mission statement cards
- [project-cards.css](project-cards.css) - Project showcase cards
- [search-results.css](search-results.css) - Search result displays

**All components reference semantic variables, so updating `main.css` theme colors updates everything!**

## 🚀 Quick Theme Examples

### Minimal Monochrome
```css
--theme-primary: #000000;
--theme-primary-dark: #1a1a1a;
--theme-primary-light: #666666;
--theme-primary-lighter: #999999;
```

### Ocean Blue
```css
--theme-primary: #0077be;
--theme-primary-dark: #005a8e;
--theme-primary-light: #4da3d8;
--theme-primary-lighter: #80bde6;
```

### Sunset Orange
```css
--theme-primary: #ff6b35;
--theme-primary-dark: #e64a19;
--theme-primary-light: #ff8c61;
--theme-primary-lighter: #ffad8d;
```

## 📚 Additional Resources

- [CSS Custom Properties (MDN)](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)
- [Using CSS custom properties (variables)](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
- [prefers-color-scheme](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme)

---

**Need help?** All CSS files are documented with section headers for easy navigation. The design system is built for developer experience and ease of maintenance.
