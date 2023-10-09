module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      transitionProperty: {
        height: 'height',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      keyframes: {
        serviceAnimation: {
          '0%': {
            transform: 'translate(0, 0)',
          },
          '100%': {
            transform: 'translate(var(--translate-x, 0), var(--translate-y, 0))',
          },
        },
        shiftBottom: {
          from: {
            bottom: '82px',
          },
          to: {
            bottom: '86px',
          },
        },
      },
      animation: {
        'service-animation': 'serviceAnimation 1s ease-in-out',
        'shift-bottom': 'shiftBottom 0.3s ease-in-out forwards',
      },
    },
  },
  mode: 'jit',
  plugins: [],
};
