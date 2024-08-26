<script lang="ts" setup>
import Post from "@/components/features/post/Post.vue";
import {PostListPropsType} from "@/components/features/post/types.ts";
import PostPopup from "@/components/features/post/PostPopup.vue";
import {usePostsStore} from "@/store/posts";
import EmptyData from "@/components/features/post/components/EmptyData.vue";
import {useRoute} from "vue-router";
import {computed} from "vue";

const props = defineProps<PostListPropsType>()
const postStore = usePostsStore()
const route = useRoute();

const isLoadingPosts = computed(() => postStore.isLoadingPosts)

</script>

<template>
  <section>
    <div v-if="isLoadingPosts">
      LOADING ...
    </div>
    <div v-else>
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-x-[20px] gap-y-[40px] text-14-14-500">
        <Post v-for="post in props.posts"
              @click="postStore.initPostModalInfo({
                post: post,
                showModal: true
             })"
              :post="post"
              :key="post.id"
              class="cursor-pointer"
        />
      </div>

      <div v-if="props.posts.length === 0 && route.query.inputSearch">
        <EmptyData
            title="Поиск не дал результатов"
            description="Повторите поиск или используйте фильтр для структуризации контента" />
      </div>
      <div v-if="props.posts.length === 0 && !route.query.inputSearch">
        <EmptyData
            title="Данные не получены"
        />
      </div>
    </div>

  </section>
  <PostPopup />
</template>

<style lang="scss" scoped>
.blog_section {
  background-color: $primary-color-gray;
}

</style>