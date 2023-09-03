// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },
    modules: ['@nuxtjs/tailwindcss'],
    runtimeConfig: {
        public: {
            firebase: {
                apiKey: '<apiKey>',
                authDomain: '<authDomain>',
                projectId: '<projectId>',
                storageBucket: '<storageBucket>',
                messagingSenderId: '<messagingSenderId>',
                appId: '<appId>',
            },
        },
    },
});
