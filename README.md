# StaPH-B Nexus

StaPH-B (State Public Health Bioinformatics) Nexus - A searchable resource platform for bioinformatics pipelines, training materials, and resources.

## 📚 Documentation

**For developers adding content or categories to the search:**

- **[Nexus Search Guide](docs/NEXUS_SEARCH_GUIDE.md)** - Complete implementation guide
- **[Quick Reference](docs/NEXUS_QUICK_REF.md)** - Fast lookup and code snippets (Start here!)
- **[Architecture Diagrams](docs/NEXUS_DIAGRAMS.md)** - Visual system overview
- **[CSS Theme Guide](app/assets/css/THEME_GUIDE.md)** - Customize site colors and design

All documentation is in the [`/docs`](docs/) directory with a comprehensive [README](docs/README.md).

## 🎨 Design System

This project uses a harmonized CSS design system for easy theme customization. To change the site's color scheme, simply update the theme colors in [`app/assets/css/main.css`](app/assets/css/main.css). See the [Theme Guide](app/assets/css/THEME_GUIDE.md) for details.

---

Look at the [Nuxt Content documentation](https://content.nuxt.com) to learn more.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
