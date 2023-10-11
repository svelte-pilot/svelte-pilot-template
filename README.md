# Svelte Pilot Template

Kickstart your Svelte projects with our efficient template, enhanced with Server-Side Rendering (SSR) and essential built-in features.

## Core Features
- **Routing:** Powered by [Svelte Pilot](https://github.com/jiangfengming/svelte-pilot).
- **TypeScript:** Enabled for type safety and robust coding.
- **Styling:** Integrated with PostCSS and Tailwind CSS.
- **Image Importing:** Auto-bundles images with `<img src="./path/to/img.png">`.
- **CSS Isolation:** Enhanced with [svelte-preprocess-css-hash](https://github.com/jiangfengming/svelte-preprocess-css-hash). `<Child class="--child-cls">` becomes `<Child class="--child-cls-HaShEd">`.

## Quick Preview
Try an editable demo [here](https://stackblitz.com/~/github.com/jiangfengming/svelte-pilot-template?startScript=dev:ssr).

## Project Setup

In your project folder, run:

```sh
npm init svelte-pilot
npm i

npm run dev:csr          # CSR mode
npm run dev:ssr          # SSR mode
```

## Build

```sh
npm run build:csr        # CSR mode
npm run build:node       # node.js SSR server
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
npm run start:csr        # CSR mode
npm run start:node       # node.js SSR server
```

## Deploy to Cloud

### Cloudflare Pages

#### Deploy with `wrangler` CLI:

```sh
wrangler pages deploy dist/client
```

#### Deploy with Git

1. Link your Git repository to Cloudflare Pages.
2. Set build configuration:
   - Build command: `npm run build:cloudflare`
   - Build output directory: `/dist/client`

### Netlify

Deploy with CLI: `netlify deploy` or link your Git repository to Netlify.

## License

Licensed under the [MIT License](LICENSE). 