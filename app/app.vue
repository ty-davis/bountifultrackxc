<script setup lang="ts">
import { siteConfig } from '@/lib/site'

useHead({
  link: [
    { rel: 'icon', type: 'image/x-icon', href: '/assets/bird_head.ico'}
  ],
  bodyAttrs: {
    class: 'min-h-screen bg-[var(--bhs-charcoal)] text-foreground antialiased'
  },
  titleTemplate: (titleChunk) =>
    titleChunk ? `${titleChunk} | ${siteConfig.name}` : siteConfig.name,
  meta: [
    {
      name: 'description',
      content: siteConfig.description
    }
  ]
})
</script>

<template>
  <div class="min-h-screen bg-[var(--bhs-charcoal)]">
    <NuxtRouteAnnouncer />
    <SiteNavbar />

    <main class="mx-auto max-w-[1200px] px-4 py-6 sm:px-6 lg:px-8">
      <section class="overflow-hidden border border-black/10 bg-white shadow-[0_0_20px_-10px_#363636]">
        <div class="border-b border-black/10 px-6 py-4 sm:px-8">
          <p class="text-xs font-bold tracking-[0.28em] uppercase text-[var(--bhs-red)]">
            Bountiful
          </p>
        </div>
        <div class="px-6 py-8 sm:px-10">
          <NuxtPage />
        </div>
      </section>
    </main>
  </div>
</template>
