// module.exports 
export default {
  content:  ['./src/**/*.{js,jsx,ts,tsx}', './src/*.{js,jsx,ts,tsx}', './public/*.html'],
  theme: {
    extend: ['light', 'dark'],
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [
    require('daisyui')
  ],
  experimental: {
    exportConfig: true,
  },
} 
