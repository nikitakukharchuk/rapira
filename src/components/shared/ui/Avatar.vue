<script lang="ts" setup>
const props = defineProps<{
  imgSrc: string;
  width?: string;
  height?: string;
}>()

const width = props.width || '10px';
const height = props.height || '10px';
</script>

<template>
  <div :style="{ width, height }" class="rounded-full">
    <img :src="props.imgSrc" alt="avatar" >
  </div>
</template>