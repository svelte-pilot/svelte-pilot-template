# svelte-vite-ssr
svelte-vite-ssr is a project template for building Svelte applications with a powerful [router](https://github.com/jiangfengming/svelte-pilot), SSR (Server-Side Rendering), CSR (Client-Side Rendering), HMR (Hot Module Replacement), `<link rel="preload">` directives, and other useful features.

## Demo
https://svelte-vite-ssr.pages.dev/

## Create a project from template
In your project folder, run:

```sh
npm init svelte-vite-ssr
npm install
```

## Run in SSR mode (development)
```sh
npm run dev:ssr
```

## Run in CSR mode (development)
```sh
npm run dev:csr
```

## Build SSR

### nodejs server:
```sh
npm run build:nodejs
```

### Cloudflare Pages:
#### Deploy with `wrangler` CLI:
```sh
npm run build:cloudflare
wrangler pages publish dist/client
```

#### Deploy with Git:
* Link your Git repository to Cloudflare Pages.
* Set build configuration:
  Build command: `npm run build:cloudflare`
  Build output directory: `/dist/client`

### Netlify Functions
* Place `src/adapters/netlify/netlify.toml` in the root directory.
* Deploy with `netlify` CLI or link your Git repository to Netlify.
* Set environment variables in Netlify web UI:
  AWS_LAMBDA_JS_RUNTIME: nodejs18.x
  NODE_VERSION: 18

### Netlify Edge Functions:
* Place `src/adapters/netlify-edge/netlify.toml` in the root directory.
* Deploy with `netlify` CLI or link your Git repository to Netlify.
* Set environment variables in Netlify web UI:
  AWS_LAMBDA_JS_RUNTIME: nodejs18.x
  NODE_VERSION: 18

## Build CSR
```sh
npm run build:csr
```

## Run nodejs SSR (production)
```sh
npm run serve:nodejs
```

## Run CSR (preview)
In production, you should use web server such as nginx.

```sh
npm run serve:csr
```

## Features

### Router
Check out [svelte-pilot](https://github.com/jiangfengming/svelte-pilot)

### Automatic image importing
In a svelte file, `<img src="./path/to/img.png">` will automatically import and bundle the image file.

### Passing hashed CSS class names to child components
Check out [svelte-preprocess-css-hash](https://github.com/jiangfengming/svelte-preprocess-css-hash)

### Official svelte-preprocess
Check out [svelte-preprocess](https://github.com/sveltejs/svelte-preprocess)

## License
This project is licensed under the [MIT License](LICENSE).
