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
          <th>Info</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="page in pages" :key="page.path">
          <tr>
            <td>
              {{ page.title }}
            </td>
            <td>
              {{ page.date }}
            </td>
            <td>
              <a :href="page.path">Info</a>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>
