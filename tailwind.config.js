module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}', './src/*.{js,jsx,ts,tsx}', './public/*.html'],

    theme: {
        extend: ['light', 'dark'],
    },
    plugins: [require('daisyui')],
};
// require('daisyui')
