import type {Config} from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'ableton-gray': '#464646',
        'ableton-white': '#dcdcdc',
        'ableton-blue': '#7BDCF3',
      },
    },
  },
  plugins: [],
};

export default config;
