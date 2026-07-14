<script setup lang="ts">

const route = useRoute()

const { data: page } = await useAsyncData(
  `content:${route.path}`,
  () => queryCollection('content').path(route.path).first(),
  {
    watch: [() => route.path]
  }
)

</script>

<template>
  <div>
    <h1> {{ page.title }} </h1>
    <h3> 
      <template v-if="page.location">
        {{ page.location }} | 
      </template>
      {{ formatDate(page.date) }}
    </h3>
    <a :href="page.results" target="_blank">Results</a>
  </div>
</template>
