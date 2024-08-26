<script lang="ts" setup>
import { usePostsStore } from "@/store/posts";
import Modal from "@/components/shared/ui/Modal.vue";
import Post from "@/components/features/post/Post.vue";
import { computed } from "vue";

const postsStore = usePostsStore();

const postPopupInfo = computed(() => {
  return {
    post: postsStore.postModalInfo.post || null,
    showModal: postsStore.postModalInfo.showModal || false,
  };
});

function closePopup() {
  postsStore.initPostModalInfo({
    post: null,
    showModal: false,
  });
}
</script>

<template>
  <Modal @close="closePopup" :show="postPopupInfo.showModal">
    <div class="max-w-[600px] w-full" v-if="postPopupInfo.post">
      <Post :post="postPopupInfo.post" is-in-modal/>
    </div>
  </Modal>
</template>