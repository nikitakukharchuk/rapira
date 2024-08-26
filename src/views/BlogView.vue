<script setup lang="ts">
import { computed, ref, watch, onMounted } from "vue";
import { usePostsStore } from "@/store/posts";
import { useRouter, useRoute } from "vue-router";
import Title from "@/components/shared/ui/Title.vue";
import Input from "@/components/shared/ui/Input.vue";
import Tag from "@/components/features/post/components/Tag.vue";
import PostList from "@/components/features/post/PostList.vue";
import {PostType} from "@/services/posts/types.ts";

const router = useRouter();
const route = useRoute();
const postsStore = usePostsStore();

const isLoading = computed(() => {
  return postsStore.isLoadingPosts
});


const inputSearch = ref<string>(route.query.inputSearch?.toString() || "");
const filteredTags = ref<string[]>(
    typeof route.query.filteredTags === 'string'
        ? route.query.filteredTags.split(',')
        : []
);
const isFilterOpen = ref<boolean>(false);

const tags = computed(() => postsStore.tags);

onMounted(async () => {
  await postsStore.dispatchGetPosts();
});

const isShowClearFilter = computed(() => {
  return filteredTags.value.length > 0 || inputSearch.value !== "";
});

function manageTags(tag: string): void {
  const isTagInclude = filteredTags.value.includes(tag);
  if (isTagInclude) {
    filteredTags.value = filteredTags.value.filter((t) => t !== tag);
  } else {
    filteredTags.value.push(tag);
  }
}

watch([inputSearch, filteredTags], () => {
  router.replace({
    query: {
      inputSearch: inputSearch.value || undefined,
      filteredTags: filteredTags.value.length ? filteredTags.value.join(',') : undefined,
    },
  });
},
    {
      deep: true
    });

const filteredPosts = computed(() => {
  const searchQuery = inputSearch.value.toLowerCase().trim();
  if (searchQuery === "" && filteredTags.value.length === 0) {
    return postsStore.posts;
  }
  return postsStore.posts.filter((post: PostType) => {
    const postTitle = post.title.toLowerCase();
    const postDescription = post.description.toLowerCase();
    const matchesText = postTitle.includes(searchQuery) || postDescription.includes(searchQuery);
    const matchesTags = filteredTags.value.length === 0 || filteredTags.value.some((tag) => post.tags.includes(tag));
    return matchesText && matchesTags;
  });
});

function clearFilters() {
  inputSearch.value = "";
  filteredTags.value = [];
}


</script>

<template>
  <section class="bg-[#F1F1F2] min-h-full">
    <div class="bg-white">
      <div class="container mx-auto md:px-[45px] flex flex-col">
        <div class="flex items-center justify-between py-[20px] w-full search-block">
          <div class="grid grid-cols-2 md:flex w-full gap-[10px] md:gap-[40px] items-center">
            <div class="order-1 col-span-1">
              <Title>Блог</Title>
            </div>
            <div class="order-3 md:order-2 col-span-2 ">
              <Input class="md:w-[400px]" is-icon-search placeholder="Поиск" v-model="inputSearch" />
            </div>
            <div class="flex col-span-1 ml-auto justify-end gap-[10px] items-center text-right text-14-14-500 order-2 md:order-3">
              <button @click="clearFilters" v-if="isShowClearFilter" class="clear_btn">
                Очистить
              </button>
              <button @click="isFilterOpen = !isFilterOpen" class="flex gap-[4px] items-center cursor-pointer">
                <span class="text-[#A1A5B7]">Фильтр</span>
                <img class="transition-transform" :class="{ 'rotate-180': isFilterOpen }" alt="array" src="@/assets/images/icons/arrow.svg" />
              </button>
            </div>
          </div>
        </div>
        <div class="h-0 overflow-hidden transition-all" :class="{ 'min-h-[72px] h-fit': isFilterOpen }">
          <div class="py-[20px] text-14-14-500 flex flex-wrap gap-[8px]">
            <Tag v-for="tag in tags" :key="tag" :name="tag" @toggle-tag="manageTags" :is-selected="filteredTags.includes(tag)" clickable />
          </div>
        </div>
      </div>
    </div>
    <div class="container mx-auto py-[20px]">
      <div class="p-[30px] bg-white rounded-[12px]">
        <PostList :posts="filteredPosts" />
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.search-block {
  position: relative;
  padding-bottom: 20px;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 1px;
    background-color: $primary-color-gray;
  }
}

.blog_section {
  background-color: $primary-color-gray;
}

.clear_btn {
  color: $primary-color-500;
}
</style>