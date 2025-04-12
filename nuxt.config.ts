// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-04-12",
  ssr: false,
  devtools: { enabled: true },
  modules: ["@nuxtjs/i18n", "@nuxtjs/tailwindcss"],

  components: [
    {
      // disable auto-prefixing of component names
      path: "~/components",
      pathPrefix: false,
    },
  ],

  runtimeConfig: {
    public: {
      firebase: {
        apiKey: "<apiKey>",
        authDomain: "<authDomain>",
        projectId: "<projectId>",
        storageBucket: "<storageBucket>",
        messagingSenderId: "<messagingSenderId>",
        appId: "<appId>",
      },
    },
  },

  i18n: {
    locales: ["en", "tr"],
    defaultLocale: "en",
    fallbackLocale: "en",
    detectBrowserLanguage: false,
    skipSettingLocaleOnNavigate: true,
    vueI18n: "./i18n.config.ts",
  },
});

