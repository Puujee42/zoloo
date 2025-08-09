// eslint.config.mjs

import next from 'eslint-config-next';

/** @type {import('eslint').Linter.Config[]} */
const config = [
  // The official Next.js config includes everything you need
  // for your project, including Core Web Vitals rules.
  next,

  // You can add your own custom rules here later if you want.
  // For now, keeping it simple is best.
  {
    rules: {
      // example: semi: ["error", "always"]
    },
  },
];

export default config;