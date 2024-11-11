import packageJson from './package.json'
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  ssr: false,

  app: {
    baseURL: '/chapter-editor/'
  },

  runtimeConfig: {
    public: {
      appVersion: packageJson.version
    },
  },

  modules: [
    "@nuxt/ui",
    "@nuxt/eslint",
    "@vueuse/nuxt",
  ],
  
  future: {
    compatibilityVersion: 4,
  },
  compatibilityDate: "2024-08-30",
})