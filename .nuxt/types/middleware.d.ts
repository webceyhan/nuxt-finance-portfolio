import type { NavigationGuard } from 'vue-router'
export type MiddlewareKey = string
declare module "/Users/webceyhan/Workspace/Projects/nuxt-finance-portfolio/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    middleware?: MiddlewareKey | NavigationGuard | Array<MiddlewareKey | NavigationGuard>
  }
}