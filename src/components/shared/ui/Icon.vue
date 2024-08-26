<script lang="ts" setup>

import {DefineComponent} from "vue";

const props = defineProps<{
  name: DefineComponent,
  className?: string | Record<string, boolean>,
}>()
</script>

<template>
  <component :is="props.name" :class="props.className" class="w-[`${}`]" />
</template>