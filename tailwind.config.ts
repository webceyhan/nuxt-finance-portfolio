import type { Config } from 'tailwindcss';

export default <Partial<Config>>{
    plugins: [require('daisyui')],
    daisyui: {
        themes: ['light', 'night'],
        darkTheme: 'night',
    },
};
