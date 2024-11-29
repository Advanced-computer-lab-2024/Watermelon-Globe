/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/pages/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Custom colors based on provided code
        primary: '#FF3366',      // Used for buttons and links
        hover: '#E62E5C',        // Hover color for buttons
        secondary: '#2E8B57',    // Used for header and main text
        secondaryHover: '#247A4B', // Hover color for secondary elements
        background: '#FCFCFC',   // Background color for the main page
        sectionBackground: '#F6F6F6', // Background color for sections
        cardBackground: '#FFFFFF', // Card background
        grayText: '#A0A0A0',     // Gray text used in descriptions
        lightGray: '#F5F5F5',    // Used for inputs and borders
      },
      fontSize: {
        // Custom font sizes based on your design
        '2xl': ['1.5rem', '2rem'], // Used for the header text
        '3xl': ['1.875rem', '2.25rem'], // Used for section titles
        '4xl': ['2.25rem', '2.75rem'], // Used for the large section header
      },
      spacing: {
        // Custom spacing
        '1/4': '25%',            // Used for padding/margin ratios
        '1/3': '33.33%',         // Used for padding/margin ratios
        '1/2': '50%',            // Used for padding/margin ratios
        '2/3': '66.66%',         // Used for padding/margin ratios
        '3/4': '75%',            // Used for padding/margin ratios
        // You might want to add more if necessary
        '1/5': '20%',            // Example of additional spacing
        '1/6': '16.66%',         // Example of additional spacing
      },
      borderRadius: {
        'lg': '12px', // Used for card and button borders
        // You could add other rounded corners if needed (e.g., 'xl' or 'full' for circular)
      },
      boxShadow: {
        'md': '0px 4px 8px rgba(0, 0, 0, 0.1)', // Subtle shadow used on cards
        'lg': '0px 8px 16px rgba(0, 0, 0, 0.1)', // Larger shadow for more emphasis
        // You can add hover or focus shadow variations if needed
        'hover-md': '0px 4px 8px rgba(0, 0, 0, 0.2)', // Hover shadow variant
      },
    },
  },
  plugins: [],
}
