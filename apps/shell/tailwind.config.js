const { join } = require('path');

module.exports = {
  content: [
    join(__dirname, 'src/**/*.{ts,html}'),
    'src/app/*.html',
    'src/app/features/**/*.html',
  ],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ['emerald'],
  },
};
