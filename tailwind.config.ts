import * as colors from 'tailwindcss/colors';

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic':
                    'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
            colors: {
                primary: {
                    ...colors.amber,
                    darker: colors.amber["600"],
                    DEFAULT: colors.amber["500"]
                },
                'primary-green': {
                    darker: '#3C8E35FF',
                    DEFAULT: '#54C34A'
                },
                'primary-blue': {
                    darker: '#8090CBFF',
                    DEFAULT: '#99ADF2'
                },
                'primary-orange': {
                    darker: '#a9740d',
                    DEFAULT: '#FFAF14'
                },
                'primary-gray': colors.zinc["500"],
            }
        },
    },
    plugins: [],
};
