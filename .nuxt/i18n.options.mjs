export const localeCodes = ["en","tr"]

export const localeMessages = {
  "en": [],
  "tr": [],
}

export const resolveNuxtI18nOptions = async (context) => {
  const nuxtI18nOptions = Object({})
  nuxtI18nOptions.experimental = Object({"jsTsFormatResource":false})
  nuxtI18nOptions.bundle = Object({"compositionOnly":true,"runtimeOnly":false,"fullInstall":true,"dropMessageCompiler":false})
  nuxtI18nOptions.compilation = Object({"jit":true,"strictMessage":true,"escapeHtml":false})
  nuxtI18nOptions.customBlocks = Object({"defaultSFCLang":"json","globalSFCScope":false})
 const vueI18nConfigLoader = async (loader) => {
            const config = await loader().then(r => r.default || r)
            return typeof config === 'object'
              ? config
              : typeof config === 'function'
                ? await config()
                : {}
          }
  const vueI18n = await vueI18nConfigLoader((() => import("../i18n.config.ts?hash=29362bae&config=1" /* webpackChunkName: "__i18n_config_ts_29362bae" */)))
  nuxtI18nOptions.vueI18n = vueI18n
  nuxtI18nOptions.vueI18n.messages ??= {}
  nuxtI18nOptions.locales = ["en","tr"]
  nuxtI18nOptions.defaultLocale = "en"
  nuxtI18nOptions.defaultDirection = "ltr"
  nuxtI18nOptions.routesNameSeparator = "___"
  nuxtI18nOptions.trailingSlash = false
  nuxtI18nOptions.defaultLocaleRouteNameSuffix = "default"
  nuxtI18nOptions.strategy = "prefix_except_default"
  nuxtI18nOptions.lazy = false
  nuxtI18nOptions.langDir = null
  nuxtI18nOptions.rootRedirect = null
  nuxtI18nOptions.detectBrowserLanguage = false
  nuxtI18nOptions.differentDomains = false
  nuxtI18nOptions.baseUrl = ""
  nuxtI18nOptions.dynamicRouteParams = false
  nuxtI18nOptions.customRoutes = "page"
  nuxtI18nOptions.pages = Object({})
  nuxtI18nOptions.skipSettingLocaleOnNavigate = true
  nuxtI18nOptions.types = "composition"
  nuxtI18nOptions.debug = false
  nuxtI18nOptions.parallelPlugin = false
  nuxtI18nOptions.fallbackLocale = "en"
  nuxtI18nOptions.i18nModules = []
  return nuxtI18nOptions
}

export const nuxtI18nOptionsDefault = Object({experimental: Object({"jsTsFormatResource":false}),bundle: Object({"compositionOnly":true,"runtimeOnly":false,"fullInstall":true,"dropMessageCompiler":false}),compilation: Object({"jit":true,"strictMessage":true,"escapeHtml":false}),customBlocks: Object({"defaultSFCLang":"json","globalSFCScope":false}),vueI18n: "",locales: [],defaultLocale: "",defaultDirection: "ltr",routesNameSeparator: "___",trailingSlash: false,defaultLocaleRouteNameSuffix: "default",strategy: "prefix_except_default",lazy: false,langDir: null,rootRedirect: null,detectBrowserLanguage: Object({"alwaysRedirect":false,"cookieCrossOrigin":false,"cookieDomain":null,"cookieKey":"i18n_redirected","cookieSecure":false,"fallbackLocale":"","redirectOn":"root","useCookie":true}),differentDomains: false,baseUrl: "",dynamicRouteParams: false,customRoutes: "page",pages: Object({}),skipSettingLocaleOnNavigate: false,types: "composition",debug: false,parallelPlugin: false})

export const nuxtI18nInternalOptions = Object({__normalizedLocales: [Object({"code":"en","iso":"en"}),Object({"code":"tr","iso":"tr"})]})
export const NUXT_I18N_MODULE_ID = "@nuxtjs/i18n"
export const isSSG = false
export const parallelPlugin = false
