# Svelte Pilot Template

A template based on the [Svelte Pilot](https://github.com/jiangfengming/svelte-pilot) routing library, offering server-side rendering (SSR) and other rich features.

## Core Features
- **Multiple Deployment Modes**: Supports SSR (Server-Side Rendering), SSG (Static Site Generation), SPA (Single Page Application), and serverless functions.
- **Powerful Routing and Layout System**: Supported by [Svelte Pilot](https://github.com/jiangfengming/svelte-pilot).
- **Integrated with TypeScript**: For type safety and robust coding.
- **Integrated with PostCSS and Tailwind CSS**: Ready to use without configuration.
- **Convenient Image Import**: Use the `<img src="./img.png">` tag directly without manually writing `import`.
- **Enhanced CSS Isolation**: Through [svelte-preprocess-css-hash](https://github.com/jiangfengming/svelte-preprocess-css-hash), `<Child class="--child">` becomes `<Child class="--child-HaShEd">`.

## Quick Preview
Experience the editable demo on the [StackBlitz Online IDE](https://stackblitz.com/~/github.com/jiangfengming/svelte-pilot-template?startScript=dev:ssr).

## Create a Project

```sh
npm init svelte-pilot my-svelte-app
cd my-svelte-app
npm i
```

Or:

```sh
mkdir my-svelte-app
cd my-svelte-app
npm init svelte-pilot
npm i
```

## Start Development Environment

```sh
npm run dev:spa          # Develop in SPA mode
npm run dev:ssr          # Develop in SSR mode
```

## Build

```sh
npm run build:spa        # Build SPA site
npm run build:node       # node.js SSR server
npm run build:ssg        # Generate static site. Configure URLs in the `ssg` field of `package.json`.
NOJS=1 npm run build:ssg # Generate static site without JS
npm run build:cloudflare # Cloudflare Pages

# Netlify Functions
cp src/adapters/netlify/netlify.toml .
npm run build:netlify

# Netlify Edge Functions
cp src/adapters/netlify-edge/netlify.toml .
npm run build:netlify-edge 
```

## Run

```sh
npm run start:static     # Start SPA or SSG site
npm run start:node       # node.js SSR server
```

## Deploy to the Cloud

### Cloudflare Pages

#### Deploy using `wrangler` CLI:

```sh
wrangler pages deploy dist
```

#### Deploy using Git

1. Link your Git repository to Cloudflare Pages.
2. Set up the build configuration:
   - Build command: `npm run build:cloudflare`
   - Build output directory: `dist`

### Netlify

Deploy using the `netlify deploy` CLI, or link your Git repository to Netlify.