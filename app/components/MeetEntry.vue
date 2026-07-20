<script setup lang="ts">
import { Icon } from '@iconify/vue'
withDefaults(defineProps<{
  title: string,
  path?: string,
  date: string,
  startTime?: string,
  results?: string,
  location?: string,
  address?: string,
  googleMapsLink?: string,
  busDepart?: string,
  busReturn?: string,
  size: 'small' | 'large',
}>(), { size: 'large' });
</script>

<template>
  <div class="flex flex-col sm:flex-row items-baseline">
    <div class="font-bold" :class="size === 'large' ? 'text-4xl' : 'text-xl'">
      <NuxtLink :href="path" v-if="path" class="!text-inherit !underline">
        {{ title }}
      </NuxtLink>
      <template v-else>
        {{ title }}
      </template>
    </div>
    <div class="sm:ml-auto">
      {{ formatDate(date) }}
      <template v-if="startTime">
        at {{ startTime }}
      </template>
    </div>
  </div>
  <div class="flex flex-col-reverse sm:flex-row">
    <div>
      <NuxtLink v-if="googleMapsLink" target="_blank" :href="googleMapsLink" class="flex gap-1 items-center">
        <Icon icon="logos:google-maps"/>
        <span v-if="location">{{ location }}</span>
        <span v-else>Maps</span>
      </NuxtLink>
      <div v-else class="flex items-center gap-1">
        <span v-if="location">{{ location }}</span>
      </div>
      <div class="">{{ address }}</div>
    </div>
    <NuxtLink :href="results" class="sm:ml-auto" target="_blank" v-if="results"> Results </NuxtLink>
  </div>
  <div class="flex items-center gap-4">
    <div class="flex items-center gap-1" v-if="busDepart"> <Icon icon="boxicons:bus"/> Leaves: {{ busDepart }}</div>
    <div class="flex items-center gap-1" v-if="busReturn"> <Icon icon="boxicons:bus"/> Returns: {{ busReturn }}</div>
  </div>
  <hr v-if="size === 'small'" class="mt-4 mb-4"/>
</template>
