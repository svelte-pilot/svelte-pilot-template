import path from 'path';
import mime from 'mime';

export default manifest => {
  for (const p in manifest) {
    if (!p.endsWith('.svelte') || p.startsWith('node_modules') || p.startsWith('\u0000')) {
      delete manifest[p];
      continue;
    }

    manifest[p] = manifest[p].filter(f => !f.includes('-legacy'));

    if (!manifest[p].length) {
      delete manifest[p];
      continue;
    }

    if (!path.isAbsolute(p)) {
      manifest[path.resolve(p)] = manifest[p];
      delete manifest[p];
    }
  }

  return {
    markup({ content, filename }) {
      const files = manifest[filename];

      if (files) {
        const headTag = '<svelte:head>';
        const tags = headTag + '\n' + files.map(preloadLink).filter(Boolean).join('\n') + '\n';

        content = content.includes(headTag)
          ? content.replace(headTag, tags)
          : tags + '</svelte:head>\n' + content;
      }

      return {
        code: content
      };
    }
  };
};

const reg = {};

function preloadLink(href) {
  if (reg[href]) {
    return '';
  } else {
    reg[href] = true;
  }

  const ext = href.split('.').pop();

  if (ext === 'js') {
    return `<link href="${href}" rel="modulepreload" as="script">`;
  } else if (ext === 'css') {
    return `<link href="${href}" rel="stylesheet">`;
  } else if (['jpg', 'jpeg', 'png', 'apng', 'webp', 'gif', 'ico'].includes(ext)) {
    return `<link href="${href}" rel="preload" as="image" type="${mime.getType(ext)}">`;
  } else if (['woff', 'woff2', 'ttf', 'otf', 'eot'].includes(ext)) {
    return `<link href="${href}" rel="preload" as="font" type="${mime.getType(ext)}" crossorigin>`;
  } else {
    return '';
  }
}
