// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    ssr: false,
    devtools: { enabled: true },
    modules: ['@nuxtjs/tailwindcss'],
    components: [
        {
            // disable auto-prefixing of component names
            path: '~/components',
            pathPrefix: false,
        },
    ],
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
