import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
    },
    extend: {
      colors: {
        primary: {
          100: "#daddf6",
          200: "#b5bbed",
          300: "#8f9ae4",
          400: "#6a78db",
          500: "#4556d2",
          600: "#3745a8",
          700: "#29347e",
          800: "#1c2254",
          900: "#0e112a",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
    },
  },
  plugins: [],
} satisfies Config;
