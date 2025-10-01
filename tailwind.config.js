/**
 * tailwind.config.js
 */
import type { Config } from 'tailwindcss';
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}', './src/*.{js,jsx,ts,tsx}', './public/*.html'],

    theme: {
        extend: ['light', 'dark'],
    },
    future: {
        hoverOnlyWhenSupported: true,
    },
    plugins: [require('daisyui')],
    experimental: {
        exportConfig: true,
    }
}  satisfies Config;
// require('daisyui')
