<script setup lang="ts">
import { ref } from 'vue';
const route = useRoute()

const { data: page } = await useAsyncData(
  `content:${route.path}`,
  () => queryCollection('content').path(route.path).first(),
  {
    watch: [() => route.path]
  }
)

if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page not found'
  })
}

useSeoMeta({
  title: () => page.value?.title,
  description: () => page.value?.description
})

const resultsPage = ref(page.value?.path?.startsWith('/results') && !page.value?.path?.endsWith('/results'))
</script>

<template>
  <article class="prose prose-zinc max-w-none prose-headings:tracking-tight prose-a:text-[var(--bhs-red)] prose-a:no-underline hover:prose-a:underline">
    <template v-if="resultsPage">
      <SiteResultsPage />
      <ContentRenderer :value="page" />
    </template>
    <template v-else>
      <ContentRenderer :value="page" />
    </template>
  </article>
</template>

