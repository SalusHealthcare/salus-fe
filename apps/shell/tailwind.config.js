const { join } = require('path');
const { createGlobPatternsForDependencies } = require('@nrwl/angular/tailwind');

module.exports = {
  content: [
    join(__dirname, 'src/**/*.{ts,html}'),
    ...createGlobPatternsForDependencies(__dirname),
    join(__dirname, '../features/structure-manager/src/**/*.html'),
    join(__dirname, '../features/authentication/src/**/*.html'),
    join(__dirname, '../features/staff-manager/src/**/*.html'),
    join(__dirname, '../features/edit-person/src/**/*.html'),
    join(__dirname, '../features/patient-manager/src/**/*.html'),
    join(__dirname, '../features/profile-manager/src/**/*.html'),
    join(__dirname, '../features/password-change/src/**/*.html'),
    'src/app/*.html',
    'src/app/features/**/*.html',
  ],
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
