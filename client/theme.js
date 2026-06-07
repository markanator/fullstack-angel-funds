import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const config = defineConfig({
  theme: {
    tokens: {
      fonts: {
        heading: { value: "Montserrat" },
        body: { value: "Roboto" },
      },
      colors: {
        color_primary: { value: "#1C2826" },
        color_alt: { value: "#EE6352" },
        color_icon: { value: "#29f0b4" },
        text_primary: { value: "#1B1F2E" },
        text_secondary: { value: "#7A7A7A" },
        text_tertiary: { value: "#838694" },
        text_four: { value: "rgba(255,255,255,0.7)" },
        progress_bg: { value: "#E9ECEF" },
        testimonial_bg: { value: "#F7F7F9" },
      },
    },
    breakpoints: {
      sm: "40em",
      md: "52em",
      lg: "64em",
      xl: "80em",
    },
  },
});

const theme = createSystem(defaultConfig, config);

export default theme;
