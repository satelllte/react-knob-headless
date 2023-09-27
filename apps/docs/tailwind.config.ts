import type {Config} from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'ableton-gray-dark': '#282828',
        'ableton-gray': '#464646',
        'ableton-gray-light': '#AAAAAA',
        'ableton-white': '#dcdcdc',
        'ableton-blue': '#7BDCF3',
      },
    },
  },
  plugins: [],
};

export default config;
