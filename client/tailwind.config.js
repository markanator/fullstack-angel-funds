const windmill = require('@windmill/react-ui/config');

module.exports = windmill({
  future: {
    removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  important: true,
  // Purging for Production is configured in PostCSS Config
  purge: {
    content: ['./src/**/*.html', './src/**/*.jsx', './src/**/*.js'],
  },
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [],
});
