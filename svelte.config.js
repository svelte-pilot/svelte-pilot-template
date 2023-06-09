// only for svelte-vscode plugin
import preprocess from "svelte-preprocess";

export default {
  preprocess: [preprocess({ postcss: true })],
};
