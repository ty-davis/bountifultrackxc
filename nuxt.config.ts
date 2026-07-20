import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/tailwind.css'],
  modules: ['@nuxt/content', 'shadcn-nuxt', 'nuxt-studio'],
  vite: {
    plugins: [tailwindcss()]
  },
  shadcn: {
    prefix: '',
    componentDir: './app/components/ui'
  },
  studio: {
    route: '/_studio',
    repository: {
      provider: 'github',
      owner: 'ty-davis',
      repo: 'bountifultrackxc',
      branch: 'master'
    }
  },
  nitro: {
    prerender: {
      routes: ['/'],
      crawlLinks: true
    }
  }
})
