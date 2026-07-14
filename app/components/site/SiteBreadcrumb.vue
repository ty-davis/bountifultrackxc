<script setup lang="ts">
import { Icon } from '@iconify/vue'
const route = useRoute()

const breadcrumbs = computed(() => {
  const segments = route.path.split('/').filter(Boolean)
  return segments.map((segment, i) => ({
    label: segment.replace(/-/g, ' '),
    path: '/' + segments.slice(0, i + 1).join('/')
  }))
})

</script>

<template>
  <nav class="flex items-center gap-1 text-xs font-bold tracking-[0.28em] uppercase text-[var(--bhs-red)]">
    <NuxtLink to="/" class="hover:underline"><Icon icon="line-md:home" class="size-5 mr-2"/></NuxtLink>
    <template v-for="(crumb, i) in breadcrumbs" :key="i">
      <span class="opacity-50">/</span>
      <NuxtLink v-if="i < breadcrumbs.length - 1" :to="crumb.path" class="hover:underline">{{ crumb.label }}</NuxtLink>
      <span v-else>{{ crumb.label }}</span>
    </template>
  </nav>
</template>
