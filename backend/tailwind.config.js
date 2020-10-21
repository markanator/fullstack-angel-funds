module.exports = {
	future: {
		// removeDeprecatedGapUtilities: true,
		// purgeLayersByDefault: true,
	},
	purge: {
		enabled: false,
		layers: ["base", "components", "utilities"],
		content: ["./**/*.html", "./**/*.pug", "./**/*.js"],
	},
	theme: {
		extend: {},
	},
	variants: {},
	plugins: [],
};
