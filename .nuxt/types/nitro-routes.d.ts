// Generated by nitro
import type { Serialize, Simplify } from 'nitropack'
declare module 'nitropack' {
  type Awaited<T> = T extends PromiseLike<infer U> ? Awaited<U> : T
  interface InternalApi {
    '/api/assets/fiat': {
      'default': Simplify<Serialize<Awaited<ReturnType<typeof import('../../server/api/assets/fiat').default>>>>
    }
    '/api/assets/gold': {
      'default': Simplify<Serialize<Awaited<ReturnType<typeof import('../../server/api/assets/gold').default>>>>
    }
    '/api/rate': {
      'default': Simplify<Serialize<Awaited<ReturnType<typeof import('../../server/api/rate').default>>>>
    }
    '/__nuxt_error': {
      'default': Simplify<Serialize<Awaited<ReturnType<typeof import('../../node_modules/nuxt/dist/core/runtime/nitro/renderer').default>>>>
    }
  }
}
export {}