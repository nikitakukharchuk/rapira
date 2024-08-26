<script lang="ts" setup>
  import {CommentType} from "@/services/posts/types.ts";
  import Avatar from "@/components/shared/ui/Avatar.vue";

  const props = defineProps<{
    comment: CommentType
  }>()
</script>

<template>
  <div class="flex items-center gap-[12px]">
    <Avatar width="38px" height="38px" :img-src="props.comment.avatar" />
    <div class="flex flex-col gap-[6px]">
      <span class="text-16-16-600">{{comment.name}}</span>
      <span class="text-14-14-500">{{comment.text}}</span>
      <span class="text-12-12-500 text-[#A1A5B7]">{{comment.date.split(',').join(' в ')}}</span>
    </div>
  </div>
</template>

