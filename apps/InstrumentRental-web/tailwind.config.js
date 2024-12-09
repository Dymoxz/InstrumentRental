const { createGlobPatternsForDependencies } = require('@nx/angular/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          "50": "#f4f7f5",
          "100": "#e0eae3",
          "200": "#c5d6ca",
          "300": "#a4b9ac",
          "400": "#849c8e",
          "500": "#6a8374",
          "600": "#556a5d",
          "700": "#45584d",
          "800": "#3A5A40",
          "900": "#2b4431",
          "950": "#1d2e22",
        },
        secondary: {
          "50": "#fdf2ec",
          "100": "#f9d8c8",
          "200": "#f3b29b",
          "300": "#ec8b6e",
          "400": "#e56a4b",
          "500": "#c96a4b", // Less saturated
          "600": "#ad5425",
          "700": "#b34e2a", // Less saturated
          "800": "#8a3e1d",
          "900": "#6a2f17",
          "950": "#4a1f10",
        }
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
};
