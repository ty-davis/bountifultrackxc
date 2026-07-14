<script setup lang="ts">
const props = defineProps<{
  path: string
  title: string
}>()

const { data: pages } = await useAsyncData(
  `content:${props.path}`,
  () => queryCollection('content')
        .where('path', 'LIKE', `/${props.path}/%`)
        .all(),
  {
    watch: [() => props.path]
  }
);

const pagesByYear = computed(() => {
  if (!pages.value) return {}
  const grouped = pages.value.reduce((acc, page) => {
    const year = new Date(page.date).getFullYear()
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
    <h2>{{ title }}</h2>
    <template v-for="year in sortedYears">
      <h3>{{ year }} Results</h3>
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
