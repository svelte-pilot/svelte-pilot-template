# Svelte Pilot Template

A template based on the [Svelte Pilot](https://github.com/svelte-pilot/svelte-pilot) routing library, offering server-side rendering (SSR) and other rich features.

## Core Features

- **Multiple Deployment Modes**: Supports SSR (Server-Side Rendering), SSG (Static Site Generation), SPA (Single Page Application), and serverless functions.
- **Powerful Routing and Layout System**: Supported by [Svelte Pilot](https://github.com/svelte-pilot/svelte-pilot).
- **Integrated with TypeScript**: For type safety and robust coding.
- **Integrated with PostCSS and Tailwind CSS**: Ready to use without configuration.
- **Convenient Image Import**: With [svelte-preprocess-import-assets](https://github.com/bluwy/svelte-preprocess-import-assets), you can directly import images using the `<img src="./img.png">` tag without manually writing an `import`.
- **Enhanced CSS Isolation**: Through [svelte-preprocess-css-hash](https://github.com/jiangfengming/svelte-preprocess-css-hash), `<Child class="-child">` becomes `<Child class="-child-HaShEd">`.

## Quick Preview

Experience the editable demo on the [StackBlitz Online IDE](https://stackblitz.com/~/github.com/svelte-pilot/svelte-pilot-template?startScript=dev:ssr).

## Create a Project

```sh
npm create svelte-pilot my-svelte-app
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

## Development

```sh
npm run dev:spa           # Develop in SPA mode
npm run dev:ssr           # Develop in SSR mode
PORT=8080 npm run dev:ssr # Specify the port.
```

## Build

```sh
npm run build:spa         # Build SPA site
npm run build:ssr         # node.js SSR server
npm run build:ssg         # Generate static site. Configure URLs in the `ssg` field of `package.json`.
NOJS=1 npm run build:ssg  # Generate static site without JS
npm run build:cloudflare  # Cloudflare Pages

# Netlify Functions
cp src/adapters/netlify/netlify.toml .
npm run build:netlify

# Netlify Edge Functions
cp src/adapters/netlify-edge/netlify.toml .
npm run build:netlify-edge
```

## Run

```sh
npx sirv-cli dist --single --host # SPA
npx sirv-cli dist --host          # SSG
npm run start:ssr                 # node.js SSR server.
PORT=8080 npm run start:ssr       # Specify the port.
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

## FAQ

### Can't run on Windows

```sh
npm config set script-shell "C:\\Program Files\\git\\bin\\bash.exe"
```

[How to set shell for npm run-scripts in Windows](https://stackoverflow.com/questions/23243353/how-to-set-shell-for-npm-run-scripts-in-windows)
