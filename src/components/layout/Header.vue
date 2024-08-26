<script setup lang="ts">
import {useRouter} from "vue-router";
import {ref} from "vue";
import MenuBar from "@/components/shared/ui/MenuBar.vue";

const router = useRouter()
const isMenuOpen = ref<boolean>(false)

</script>

<template>
  <header class="bg-black grid place-items-center transition-all overflow-hidden" :class="{'min-h-[120px]': isMenuOpen,'min-h-[60px]': !isMenuOpen}">
    <div class="container mx-auto flex flex-col md:flex-row md:items-center gap-[20px] md:gap-[80px]">
      <div class="flex items-center gap-[15px]">
        <template class="block md:hidden">
          <MenuBar v-model="isMenuOpen"/>
        </template>
        <RouterLink to="/"><img src="/src/assets/images/logo/logo.svg" alt="Logo"></RouterLink>
      </div>
      <nav :class="{'hidden': !isMenuOpen, 'block': isMenuOpen, 'md:block': true}" class="w-full md:w-auto">
        <ul class="flex text-white gap-[20px]">
          <li v-for="(route, i) in router.getRoutes()" :key="i">
            <RouterLink v-if="route.meta.name" :to="route.path" class="link text-16-16-600 px-[14px] py-[8px] rounded-[6px] transition-colors" active-class="active-link">{{ route.meta.name }}</RouterLink>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.link:hover {
  background-color: $active-header-link-bg-color;
}

.active-link {
  color: $primary-color;
  background-color: $active-header-link-bg-color;
}
</style>