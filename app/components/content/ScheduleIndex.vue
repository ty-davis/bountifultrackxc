<script setup lang="ts">
const props = defineProps<{
  path: string
  title?: string
  year?: number | string
  showAsTable?: boolean
  showPastYearsAsLinks: boolean
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
            ? `/${props.path}/%/%`
            : `/${props.path}/${selectedYear.value}/%`
        )
        .all(),
  {
    watch: [() => props.path, selectedYear]
  }
);

const isMeetPage = (pagePath: string) => {
  const segments = pagePath.split('/').filter(Boolean)

  return segments.length >= 3 && /^\d{4}$/.test(segments[1] ?? '')
}

const getPageYear = (pagePath: string, pageDate: string) => {
  const yearFromPath = pagePath.split('/').filter(Boolean)[1]

  return Number(yearFromPath ?? new Date(pageDate).getFullYear())
}

const pagesByYear = computed(() => {
  if (!pages.value) return {}
  const grouped = pages.value.reduce((acc, page) => {
    if (!isMeetPage(page.path)) {
      return acc
    }

    const year = getPageYear(page.path, page.date)
    if (!acc[year]) {
      acc[year] = []
    }
    if (year === new Date().getFullYear() || !props.showPastYearsAsLinks) {
      acc[year].push(page)
    }
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
    <template v-for="year in sortedYears">
      <h3 v-if="selectedYear === null && pagesByYear[year].length">
        <NuxtLink :href="`/${path}/${year}`">{{ year }} {{ year === new Date().getFullYear() ? 'Schedule' : 'Results' }} </NuxtLink>
      </h3>
      <template v-if="showAsTable">
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
      <template v-for="page in pagesByYear[year]" :key="page.path" v-else>
        <MeetEntry
          :title="page.title"
          :path="page.path"
          :date="page.date"
          :startTime="page.startTime"
          :results="page.results"
          :location="page.location"
          :address="page.address"
          :googleMapsLink="page.googleMapsLink"
          :busDepart="page.busDepart"
          :busReturn="page.busReturn"
          size="small"
        />
      </template>
    </template>
    <template v-if="showPastYearsAsLinks">
      Past results:
      <div class="flex gap-4">
        <NuxtLink v-for="year in sortedYears.filter(y => y !== new Date().getFullYear())" :key="year"
          :href="`/schedule/${year}`"
        >
          {{ year }}
        </NuxtLink>
      </div>
      <hr/>
    </template>
  </div>
</template>
