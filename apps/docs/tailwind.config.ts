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

        'ableton-9-gray-dark': '#323232',
        'ableton-9-gray': '#999999',
        'ableton-9-white': '#BFBFBF',
        'ableton-9-orange': '#D5824A',
      },
    },
  },
  plugins: [],
};

export default config;
