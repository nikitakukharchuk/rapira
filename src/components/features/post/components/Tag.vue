<script lang="ts" setup>

import {computed, ref} from "vue";
import Icon from "@/components/shared/ui/Icon.vue";
import cross from "@/assets/images/icons/cross.vue";
import check from "@/assets/images/icons/check.vue";
import plus from "@/assets/images/icons/plus.vue";

const props = defineProps<{
  name: string
  clickable?: boolean
  isSelected?: boolean
}>();
const emit = defineEmits(['toggleTag'])


const isHovered = ref(false);

function onMouseOver() {
  isHovered.value = true;
}

function onMouseOut() {
  isHovered.value = false;
}

const tagIcon = computed(() => {
  if (props.clickable) {
    if (!props.isSelected) return plus
    if (props.isSelected && isHovered.value) return cross
    if (props.isSelected && !isHovered.value) return check
  }
})

function toggleTag() {
  if (props.clickable) {
    emit('toggleTag', props.name);
  }
}

</script>

<template>
  <div
      :class="['tag', { 'tag--selected': props.isSelected, 'tag--clickable': props.clickable }]"
      class="flex items-center gap-[10px]"
      @click="toggleTag"
      ref="tag"
      @mouseover="onMouseOver" @mouseout="onMouseOut"
  >
    <span>{{ props.name }}</span>
    <span v-if="props.clickable" class="w-[12px] h-[12px]">
      <Icon :name="tagIcon" />
    </span>

  </div>
</template>

<style lang="scss" scoped>
.tag {
  display: inline-flex;
  align-items: center;
  padding: 6px 14px;
  border-radius: 20px;
  background-color: $primary-color-100;
  color: $primary-color-500;
  cursor: default;

  &--clickable {
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: $secondary-color;
    }
  }

  &--selected {
    background-color: $primary-color;
    color: #fff;
    &:hover {
      background-color: $primary-color;
    }
  }
}
</style>