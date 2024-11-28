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
        primary:
          {
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
            "950": "#1d2e22"
          }
      }
    },
  },
  plugins: [
    require('flowbite/plugin') // add this line

  ],
};
