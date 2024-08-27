/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class", "selector", "[data-theme='black']"], // Combined dark mode settings
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./utils/**/*.{js,ts,jsx,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#305cde", // Consistent Blue Color
          foreground: "#FFFFFF", // Content on primary color
        },
        secondary: {
          DEFAULT: "#60A5FA", // Lighter Blue for secondary elements
          foreground: "#182e6f", // Dark text on secondary color
        },
        destructive: {
          DEFAULT: "#EF4444", // Red for error
          foreground: "#FFFFFF", // Content on destructive color
        },
        muted: {
          DEFAULT: "#E5E7EB", // Light grey for muted elements
          foreground: "#212638", // Dark content on muted
        },
        accent: {
          DEFAULT: "#3B82F6", // Accent Blue
          foreground: "#FFFFFF", // Content on accent color
        },
        popover: {
          DEFAULT: "#FFFFFF", // White popover background
          foreground: "#212638", // Dark text on popover
        },
        card: {
          DEFAULT: "#FFFFFF", // White card background
          foreground: "#212638", // Dark text on card
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        center: "0 0 12px -2px rgb(0 0 0 / 0.05)", // Custom shadow
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "pulse-fast": "pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite", // Custom animation
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("daisyui")],
  darkTheme: "black", // DaisyUI dark theme configuration
  // DaisyUI theme colors
  daisyui: {
    themes: [
      {
        light: {
          primary: "#305cde", // Consistent Blue Color
          "primary-content": "#FFFFFF", // Content on primary color
          secondary: "#60A5FA", // Lighter Blue for secondary elements
          "secondary-content": "#182e6f", // Dark text on secondary color
          accent: "#3B82F6", // Accent Blue
          "accent-content": "#FFFFFF", // Content on accent color
          neutral: "#212638", // Dark Grey
          "neutral-content": "#FFFFFF", // Content on neutral (white)
          "base-100": "#FFFFFF", // Base background color (white)
          "base-200": "#F3F4F6", // Light grey background
          "base-300": "#E5E7EB", // Lighter grey background
          "base-content": "#212638", // Content color on base (dark)
          info: "#305cde", // Consistent Blue for info elements
          success: "#34D399", // Green for success
          warning: "#FBBF24", // Yellow for warning
          error: "#EF4444", // Red for error

          "--rounded-btn": "9999rem", // Button roundness

          ".tooltip": {
            "--tooltip-tail": "6px", // Tooltip tail size
          },
          ".link": {
            textUnderlineOffset: "2px", // Link underline offset
          },
          ".link:hover": {
            opacity: "80%", // Link hover opacity
          },
        },
      },
      {
        dark: {
          primary: "#305cde", // Consistent Blue Color
          "primary-content": "#FFFFFF", // Content on primary color
          secondary: "#60A5FA", // Lighter Blue for secondary elements
          "secondary-content": "#182e6f", // Light content on secondary color
          accent: "#3B82F6", // Blue for accents
          "accent-content": "#FFFFFF", // Light content on accent
          neutral: "#141414", // Very dark grey for dark mode
          "neutral-content": "#E2E8F0", // Light grey content on neutral
          "base-100": "#141414", // Black background for dark mode
          "base-200": "#000000", // Slightly lighter black for layering
          "base-300": "#000000", // Dark grey for deeper layers
          "base-content": "#F9FAFB", // Content color (off-white) in dark mode
          info: "#305cde", // Consistent Blue for info elements
          success: "#34D399", // Green for success
          warning: "#FBBF24", // Yellow for warning
          error: "#EF4444", // Red for error

          "--rounded-btn": "9999rem", // Button roundness

          ".tooltip": {
            "--tooltip-tail": "6px",
            "--tooltip-color": "oklch(var(--p))", // Tooltip color logic
          },
          ".link": {
            textUnderlineOffset: "2px", // Link underline offset
          },
          ".link:hover": {
            opacity: "80%", // Link hover opacity
          },
        },
      },
    ],
  },
};
