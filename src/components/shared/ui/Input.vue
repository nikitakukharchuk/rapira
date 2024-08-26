<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

const props = defineProps<{
  modelValue: String,
  isIconSearch: boolean,
  placeholder: String,
}>();

const emit = defineEmits(['update:modelValue', 'change']);

const updateValue = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target.value);

  emit('change', target.value);
};

const clearInput = () => {
  emit('update:modelValue', '');

  emit('change', '');
};
</script>

<template>
  <div class="search-container ">
    <img v-if="props.isIconSearch" class="search-icon" alt="search icon" src="../../../assets/images/icons/search-icon.svg" />
    <input
        type="text"
        class="search-input"
        :class="{
          'pl-[35px]': isIconSearch,
          'pl-[10px]': !isIconSearch
        }"
        :value="modelValue"
        @input="updateValue"
        :placeholder="placeholder"
    />
    <button v-if="modelValue" class="clear-icon" @click="clearInput">
      <img alt="clear icon" src="../../../assets/images/icons/clear-icon.svg" />
    </button>
  </div>
</template>

<style lang="scss" scoped>
.search-container {
  display: flex;
  align-items: center;
  height: 40px;
  border: 1px solid transparent;
  border-radius: 6px;
  background-color: $primary-color-gray;
  position: relative;
  transition: border-color 0.2s, box-shadow 0.2s;

  .search-icon {
    width: 12px;
    height: 12px;
    position: absolute;
    left: 11px;
  }

  .search-input {
    border: none;
    background: transparent;
    outline: none;
    font-size: 13px;
    font-weight: 500;
    width: 100%;

    &::placeholder {
      color: rgba(216, 216, 229, 1);
    }
  }

  .clear-icon {
    position: absolute;
    right: 15px;
    background: none;
    border: none;
    cursor: pointer;

    img {
      width: 6px;
      height: 6px;
    }
  }

  &:hover {
    border-color: $primary-color;
  }

  &:focus-within {
    border-color: $primary-color;
    outline: $secondary-color solid 2px;
  }
}
</style>