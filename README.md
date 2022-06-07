# svelte-vite-ssr
A Svelte project template with a powerful [router]((https://github.com/jiangfengming/svelte-pilot)), SSR (Server-Side Rendering), CSR (Client-Side Rendering), HMR (Hot Module Replacement), `<link rel="preload">` directives, and other nice features.

## Demo
SSR using AWS Lambda function hosted on Netlify.

https://svelte-vite-ssr.netlify.app/

## Commands
### Create a project from template
In your project folder:

```sh
npm init svelte-vite-ssr
npm install
```

### Run in SSR mode (dev)
```sh
npm run dev:ssr
```

### Run in CSR mode (dev)
```sh
npm run dev:csr
```

### Build SSR
```sh
npm run build:ssr
```

### Build CSR
```sh
npm run build:csr
```

### Run SSR (production)
```sh
npm run serve:ssr
```

### Run CSR (preview)
In production, you should use web server such as nginx.

```sh
npm run serve:csr
```

## Features

### Router
Checkout [svelte-pilot](https://github.com/jiangfengming/svelte-pilot)

### Auto import images
In svelte file, `<img src="./path/to/img.png">` just works, the image file will be auto imported and bundled.

### Passing hashed css classname to child component
Checkout [svelte-preprocess-css-hash](https://github.com/jiangfengming/svelte-preprocess-css-hash)

### Official svelte-preprocess
Checkout [svelte-preprocess](https://github.com/sveltejs/svelte-preprocess)

## License
[MIT](LICENSE)
