<script setup lang="ts">
  const props = defineProps<{
    title: string,
    description?: string,
  }>()
</script>

<template>
  <div class="text-center flex flex-col">
    <img src="@/assets/images/icons/search-list.svg" alt="empty img" class="mb-[8px] h-[40px]">
    <span v-text="props.title" class="mb-[4px] text-14-14-500"/>
    <span v-text="props.description" class="text-12-20-500 text-[#A1A5B7]" />
  </div>
</template>