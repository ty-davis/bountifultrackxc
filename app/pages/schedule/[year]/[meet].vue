<script setup lang="ts">
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
</script>

<template>
  <article class="prose prose-zinc max-w-none prose-headings:tracking-tight prose-a:text-[var(--bhs-red)] prose-a:no-underline hover:prose-a:underline">
    <MeetEntry
      :title="page.title"
      :date="page.date"
      :startTime="page.startTime"
      :results="page.results"
      :location="page.location"
      :address="page.address"
      :googleMapsLink="page.googleMapsLink"
      :busDepart="page.busDepart"
      :busReturn="page.busReturn"
    />
    <ContentRenderer :value="page" />
  </article>
</template>
