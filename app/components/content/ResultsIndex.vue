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

</script>

<template>
  <div>
    <h2>{{ title }}</h2>
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Date</th>
          <th>Results</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="page in pages" :key="page.path">
          <tr>
            <td>
              <a :href="page.path"> {{ page.title }} </a>
            </td>
            <td>
              {{ formatDate(page.date, 'short') }}
            </td>
            <td>
              <a v-if="page.results" :href="page.results">Results</a>
              <span v-else>Coming soon</span>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>
