const defaultTheme = require("tailwindcss/defaultTheme");

const palette = {
  blue: {
    dark: "#076678",
    DEFAULT: "#458588",
    light: "#83a598",
  },
  red: {
    dark: "#9d0006",
    DEFAULT: "#cc241d",
    light: "#fb4934",
  },
  yellow: {
    dark: "#b57614",
    DEFAULT: "#d79921",
    light: "#fadb2f",
  },
  green: {
    dark: "#97940e",
    DEFAULT: "#98971a",
    light: "#b8bb26",
  },
  purple: {
    dark: "#8f3f71",
    DEFAULT: "#b16286",
    light: "#d3869b",
  },
  teal: {
    dark: "#427b58",
    DEFAULT: "#689d6a",
    light: "#8ec07c",
  },
  orange: {
    dark: "#af3a03",
    DEFAULT: "#d65d0e",
    light: "#fe8019",
  },
  grey: {
    1: "#1d2021",
    2: "#282828",
    3: "#3c3836",
    4: "#504945",
    5: "#655c54",
    6: "#7c6f64",
    7: "#928374",
    8: "#a99984",
    9: "#bdae93",
    10: "#d5c4a1",
    11: "#ebdbb2",
    12: "#fbf1c7",
  },
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      ...palette,
    },
    extend: {
      fontFamily: {
        sans: ["IBM Plex Sans", ...defaultTheme.fontFamily.sans],
        serif: ["Bungee Shade", ...defaultTheme.fontFamily.serif],
      },
      gridTemplateColumns: {
        "project-summary": "1fr 2fr",
      },
    },
  },
  plugins: [],
};
