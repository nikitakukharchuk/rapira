<script setup lang="ts">
import DefaultLayout from "./layouts/DefaultLayout.vue";
import {computed} from "vue";
import {useRoute} from "vue-router";

const route = useRoute();
const layout = computed(() => {
  return route.meta.layout || DefaultLayout;
});
</script>

<template>
  <component :is="layout">
    <router-view></router-view>
  </component>
</template>

