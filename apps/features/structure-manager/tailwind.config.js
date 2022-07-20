const { join } = require('path');

module.exports = {
  content: [join(__dirname, 'src/**/*.{ts,html}'), 'src/app/**/*.html'],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: {
    styled: true,
    themes: ['emerald'],
    base: true,
    utils: true,
    logs: true,
    rtl: false,
  },
};
