<script setup lang="ts">
defineProps<{
  src: string
  title: string
}>()
</script>

<template>
  <div class="overflow-hidden rounded-xl border border-black/10 bg-white">
    <iframe
      :src="src"
      :title="title"
      class="h-[70vh] w-full"
      loading="lazy"
      referrerpolicy="no-referrer-when-downgrade"
    />
  </div>
</template>
