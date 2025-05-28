// next-app/tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Custom colors will be added here in the next step
        // Typology backgrounds
        'typo-2p4': '#f1d0ec',
        'typo-3p6': '#b6d7a8',
        'typo-2p4-5': '#ffe599',
        'typo-3p6-7': '#a4c2f4',
        'typo-staff': 'lightcoral',

        // Apartment status colors
        'status-occupe': '#ffe599',
        'status-en-chauffe': 'lightsalmon',
        'status-pret': '#b6d7a8',
        'status-bcs': '#29ab87',
        'status-libre-sale': 'lightpink',

        // Intervention status colors
        'int-action-prioritaire': 'red',
        'int-arrivee-du-jour': 'rgb(191, 233, 166)',
        'int-demande-inter': 'lightsalmon',
        'int-resolu': 'lightseagreen',
        'int-en-attente': 'rgb(246, 176, 246)',
        'int-en-commande': '#ffe599',
        'int-depart-du-client': 'rgb(190, 84, 190)',
        'int-vta': 'lightskyblue',
        'int-bloque-tech': '#1600dd',

        // Header/Footer
        'brand-header': '#438eb9',
        'brand-button': '#108fe8',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};
export default config;
