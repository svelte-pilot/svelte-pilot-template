import fs from 'fs';

const manifest = JSON.parse(fs.readFileSync('./dist/tmp/ssr-manifest.json', 'utf8'));

for (let path in manifest) {
  if (!path.endsWith('.svelte') || path.startsWith('node_modules') || path.startsWith('\u0000')) {
    delete manifest[path];
    continue;
  }

  manifest[path] = manifest[path].filter(f => !f.includes('-legacy'));

  if (!manifest[path].length) {
    delete manifest[path];
    continue;
  }

  if (!path.startsWith('/')) {
    const old = path;
    path = process.cwd() + '/' + path;
    manifest[path] = manifest[old];
    delete manifest[old];
  }
}

fs.writeFileSync('./dist/tmp/ssr-manifest.json', JSON.stringify(manifest, null, 2));
