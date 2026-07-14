<script setup lang="ts">
const route = useRoute()

const segment = computed(() => route.params.year?.toString() ?? '')
const validYear = computed(() => /^\d{4}$/.test(segment.value))
const isThisYear = computed(() => parseInt(segment.value) === new Date().getFullYear());

const { data: pages } = await useAsyncData(
  `content:results:${segment.value}`,
  () => {
    if (!validYear.value) {
      return []
    }

    return queryCollection('content')
      .where('path', 'LIKE', `/schedule/${segment.value}/%`)
      .all()
  },
  {
    watch: [segment]
  }
)

const { data: page } = await useAsyncData(
  `content:${route.path}`,
  () => {
    if (validYear.value) {
      return null
    }

    return queryCollection('content').path(route.path).first()
  },
  {
    watch: [() => route.path, validYear]
  }
)

if ((validYear.value && !pages.value?.length) || (!validYear.value && !page.value)) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page not found'
  })
}

useSeoMeta({
  title: () => validYear.value ? `${segment.value} ${ isThisYear ? 'Schedule' : 'Results'}` : page.value?.title,
  description: () => validYear.value ? `Meet results from ${segment.value}.` : page.value?.description
})
</script>

<template>
  <article class="prose prose-zinc max-w-none prose-headings:tracking-tight prose-a:text-[var(--bhs-red)] prose-a:no-underline hover:prose-a:underline">
    <template v-if="validYear">
      <h1>{{ segment }} {{ isThisYear ? 'Schedule' : 'Results' }}</h1>
      <ScheduleIndex path="schedule" :year="segment" :showAsTable="!isThisYear"/>
    </template>
    <template v-else>
      <ContentRenderer :value="page" />
    </template>
  </article>
</template>
