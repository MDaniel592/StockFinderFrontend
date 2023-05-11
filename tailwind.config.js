module.exports = {
  important: true,
  // Active dark mode on class basis
  darkMode: "class",
  i18n: {
    locales: ["es-ES"],
    defaultLocale: "es-ES",
  },
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}", "./public/**/*.avif", "./public/**/**/*.jpg"],
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        astronaut: "url('/images/astronaut.webp')",
        check: "url('/icons/check.svg')",
        landscape: "url('/images/landscape/2.jpg')",
      }),
      colors: {
        header: "#161B22",
        github: "#0D1117",
        "mui-boxes": "#3B3B3B",
        "google-dark": "#202124",
        info: {
          light: "#DAF8FF",
          DEFAULT: "#2372FC",
        },
        success: {
          light: "#FFFFDB",
          DEFAULT: "#62CC30",
        },
        warning: {
          light: "#FFD699",
          DEFAULT: "#FF9900",
        },
        error: {
          light: "#FCC3BF",
          DEFAULT: "#FC3628",
          dark: "#C70039",
        },
      },
    },
    fontSize: {
      xxs: ".7rem",
      xs: ".75rem",
      sm: ".875rem",
      tiny: ".875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
      "6xl": "4rem",
      "7xl": "5rem",
      "8xl": "7rem",
      "9xl": "9rem",
      "10xl": "12rem",
    },
  },

  variants: {
    extend: {
      backgroundColor: ["checked"],
      borderColor: ["checked"],
      inset: ["checked"],
      zIndex: ["hover", "active"],
    },
  },
  plugins: [],
  future: {
    purgeLayersByDefault: true,
  },
};
