/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {},
        fontFamily: {
            sans: ["sans-serif, serif"],
            serif: ["serif"],
        },
    },
    plugins: [
        require("@tailwindcss/typography"),
        // ...
    ],
};
