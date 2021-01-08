import { extendTheme } from '@chakra-ui/react'
import { createBreakpoints } from '@chakra-ui/theme-tools'

const fonts = {
  heading: "Montserrat",
  body: "Roboto",
}

const breakpoints = createBreakpoints({
  sm: '40em',
  md: '52em',
  lg: '64em',
  xl: '80em',
})

const theme = extendTheme({
  colors: {
    color_primary: '#1C2826',
    color_alt: '#EE6352',
    color_icon: '#29f0b4',
    text_primary: '#1B1F2E',
    text_secondary: '#7A7A7A',
    text_tertiary: '#838694',
    text_four: 'rgba(255,255,255,0.7)',
    progress_bg: '#E9ECEF',
    testimonial_bg: '#F7F7F9',
  },
  fonts,
  breakpoints,
  icons: {
    logo: {
      path: (
        <svg
          width="3000"
          height="3163"
          viewBox="0 0 3000 3163"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="3000" height="3162.95" fill="none" />
          <path
            d="M1470.89 1448.81L2170 2488.19H820V706.392H2170L1470.89 1448.81ZM1408.21 1515.37L909.196 2045.3V2393.46H1998.84L1408.21 1515.37Z"
            fill="currentColor"
          />
        </svg>
      ),
      viewBox: '0 0 3000 3163',
    },
  },
})

export default theme
