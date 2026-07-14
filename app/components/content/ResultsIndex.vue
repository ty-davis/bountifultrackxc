<script setup lang="ts">
const props = defineProps<{
  path: string
  title?: string
  year?: number | string
}>()

const selectedYear = computed(() => {
  if (props.year === undefined) {
    return null
  }

  return Number(props.year)
})

const { data: pages } = await useAsyncData(
  `content:${props.path}:${selectedYear.value ?? 'all'}`,
  () => queryCollection('content')
        .where(
          'path',
          'LIKE',
          selectedYear.value === null
            ? `/${props.path}/%`
            : `/${props.path}/${selectedYear.value}/%`
        )
        .all(),
  {
    watch: [() => props.path, selectedYear]
  }
);

const getPageYear = (pagePath: string, pageDate: string) => {
  const yearFromPath = pagePath.split('/').filter(Boolean)[1]

  return Number(yearFromPath ?? new Date(pageDate).getFullYear())
}

const pagesByYear = computed(() => {
  if (!pages.value) return {}
  const grouped = pages.value.reduce((acc, page) => {
    const year = getPageYear(page.path, page.date)
    if (!acc[year]) acc[year] = []
    acc[year].push(page)
    return acc
  }, {} as Record<number, typeof pages.value>)
  for (const year in grouped) {
    grouped[year].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  }
  return grouped
})

const sortedYears = computed(() =>
  Object.keys(pagesByYear.value).map(Number).sort((a, b) => b - a)
)
</script>

<template>
  <div>
    <h2 v-if="title">{{ title }}</h2>
    <template v-for="year in sortedYears">
      <h3 v-if="selectedYear === null">
        <NuxtLink :href="`/${path}/${year}`">{{ year }} Results</NuxtLink>
      </h3>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Date</th>
            <th>Results</th>
          </tr>
        </thead>
        <tbody>
          <template v-for="page in pagesByYear[year]" :key="page.path">
            <tr>
              <td>
                <NuxtLink :href="page.path"> {{ page.title }} </NuxtLink>
              </td>
              <td>
                {{ formatDate(page.date, 'short') }}
              </td>
              <td>
                <NuxtLink v-if="page.results" :href="page.results" target="_blank">Results</NuxtLink>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </template>
  </div>
</template>
