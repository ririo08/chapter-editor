import packageJson from './package.json'
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  modules: [
    '@nuxt/ui',
    '@nuxt/eslint',
    '@vueuse/nuxt',
  ],

  ssr: false,
  devtools: { enabled: true },

  app: {
    baseURL: '/chapter-editor/',
    head: {
      title: 'Video Chapter Editor',
    },
  },

  runtimeConfig: {
    public: {
      appVersion: packageJson.version,
    },
  },

  future: {
    compatibilityVersion: 4,
  },
  compatibilityDate: '2024-08-30',

  eslint: {
    config: {
      stylistic: true,
    },
  },
})
