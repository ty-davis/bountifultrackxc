<script setup lang="ts">
const route = useRoute()

const year = computed(() => route.params.year?.toString() ?? '')
const validYear = computed(() => /^\d{4}$/.test(year.value))

const { data: pages } = await useAsyncData(
  `content:results:${year.value}`,
  () => {
    if (!validYear.value) {
      return []
    }

    return queryCollection('content')
      .where('path', 'LIKE', `/results/${year.value}/%`)
      .all()
  },
  {
    watch: [year]
  }
)

if (!validYear.value || !pages.value?.length) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page not found'
  })
}

useSeoMeta({
  title: () => `${year.value} Results`,
  description: () => `Meet results from ${year.value}.`
})
</script>

<template>
  <article class="prose prose-zinc max-w-none prose-headings:tracking-tight prose-a:text-[var(--bhs-red)] prose-a:no-underline hover:prose-a:underline">
    <h1>{{ year }} Results</h1>
    <ResultsIndex path="results" :year="year" />
  </article>
</template>
