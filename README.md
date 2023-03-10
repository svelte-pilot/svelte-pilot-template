# svelte-vite-ssr
svelte-vite-ssr is a project template for building Svelte applications with a powerful router, SSR (Server-Side Rendering), CSR (Client-Side Rendering), HMR (Hot Module Replacement), <link rel="preload"> directives, and other useful features.

## Demo
See the SSR implementation in action using an AWS Lambda function hosted on Netlify:
https://svelte-vite-ssr.netlify.app/

## Commands
### Create a project from template
In your project folder, run:

```sh
npm init svelte-vite-ssr
npm install
```

### Run in SSR mode (development)
```sh
npm run dev:ssr
```

### Run in CSR mode (development)
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
Check out [svelte-pilot](https://github.com/jiangfengming/svelte-pilot)

### Automatic image importing
In a svelte file, `<img src="./path/to/img.png">` will automatically import and bundle the image file.

### Passing hashed CSS class names to child components
Check out [svelte-preprocess-css-hash](https://github.com/jiangfengming/svelte-preprocess-css-hash)

### Official svelte-preprocess
Check out [svelte-preprocess](https://github.com/sveltejs/svelte-preprocess)

## License
This project is licensed under the [MIT License](LICENSE).
