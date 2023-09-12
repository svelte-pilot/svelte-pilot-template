module.exports = {
  plugins: {
    "tailwindcss/nesting": "postcss-nesting",
    tailwindcss: {},
    "postcss-preset-env": {
      features: { "nesting-rules": false },
    },
  },
};
