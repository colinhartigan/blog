/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {},
        fontFamily: {
            sans: ["IBM Plex Serif, serif"],
            serif: ["serif"],
        },
    },
    plugins: [
        require("@tailwindcss/typography"),
        // ...
    ],
    darkMode: "class",
};
