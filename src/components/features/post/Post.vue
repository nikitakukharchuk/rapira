<script lang="ts" setup>
import {PostPropsType} from "@/components/features/post/types.ts";
import Tag from "@/components/features/post/components/Tag.vue";
import {getCommentWordForm} from "@/components/shared/utils/commentWordForm.ts";
import Comment from "@/components/features/post/components/Comment.vue";
import Input from "@/components/shared/ui/Input.vue";
import {ref} from "vue";
import Textarea from "@/components/shared/ui/Textarea.vue";
import Button from "@/components/shared/ui/Button.vue";
import {usePostsStore} from "@/store/posts";

const props = withDefaults(defineProps<PostPropsType>(), {
  isInModal: false
})

const postsStore = usePostsStore()
const commentInput = ref<string>('')
const isFocused = ref<boolean>(false)
const { post, isInModal } = props
const isValidComment = ref<boolean>(false)

function setIsValid(value: boolean) {
  isValidComment.value = value
}

function resetData() {
  isValidComment.value = false
  isFocused.value = false
  commentInput.value = ''
}

function addComment() {
  postsStore.initAddPostComment({id: post.id, comment: commentInput.value})
  resetData()
}

</script>

<template>
  <div class="flex flex-col" :class="{
    'gap-[10px]': !isInModal,
    'gap-[15px]': isInModal
  }">
    <img class="w-full rounded-[12px]" :class="{
      'order-1 h-[250px]': !isInModal,
      'order-3 max-h-[400px]': isInModal
    }" :src="post.image" alt="picture">
    <div class="flex gap-[10px] items-center post_info order-2" :class="{
      'text-14-14-500': !isInModal,
      'text-12-12-500 md:text-14-14-500': isInModal
    }">
      <div>{{post.date}}</div>
      <span class="separator"></span>
      <div class="flex items-center gap-[6px]">
        <img src="@/assets/images/icons/time.svg" alt="time" />
        <span>{{ post.readTime }}</span>
      </div>
      <span class="separator"></span>
      <div class="flex items-center gap-[6px]">
        <img src="@/assets/images/icons/messages.svg" alt="time" />
        <span>{{ post.comments.length }} {{getCommentWordForm(post.comments.length)}}</span>
      </div>
    </div>
    <div :class="{
      'order-3 text-22-22-600': !isInModal,
      'order-1 text-20-20-600 md:text-24-24-600': isInModal
    }">{{ post.title }}</div>
    <div class="order-4" :class="{
      'text-16-25-500': !isInModal,
      'text-14-20-500 md:text-16-25-500': isInModal
    }"
    >
      {{ post.description }}
    </div>
    <div class="flex gap-[10px] order-5">
      <Tag v-for="tag in post.tags" :name="tag"/>
    </div>
    <div v-if="isInModal" class="order-6 flex flex-col gap-[10px]">
      <span class="text-16-16-600">Комментариев <span class="text-16-25-500 text-[#7E8299]">{{post.comments.length}}</span></span>
      <Textarea @is-valid="setIsValid" :max-symbols="250" v-model="commentInput" @focus="isFocused = true" @focusout="isFocused = false"  placeholder="Введите комментарий" />
      <div class="flex gap-[10px] justify-end">
        <Button class="btn__reset" :disabled="isValidComment" @click="resetData">Отмена</Button>
        <Button class="btn__submit" :disabled="isValidComment" @click="addComment">Опубликовать</Button>
      </div>
      <div class="flex flex-col gap-[10px]">
        <Comment v-for="(comment, i) in post.comments" :key="i" :comment="comment" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.separator::before {
  content: "•";
}

.post_info {
  color: $primary-color-gray-600
}

.btn__reset {
  color: $primary-color;
  background-color: $primary-color-100;
}

.btn__submit {
  color: #ffffff;
  background-color: $primary-color;
}
</style>