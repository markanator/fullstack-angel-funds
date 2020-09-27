module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: {
    enabled: true,
    layers: ['base', 'components', 'utilities'],
    content: ['./**/*.html', './**/*.pug', './**/*.js'],
  },
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [],
};
