<script setup lang="ts">
import { ref, watch, defineEmits, defineProps, computed } from "vue";

const props = defineProps({
  modelValue: String,
  placeholder: {
    type: String,
    default: "Введите текст...",
  },
  maxSymbols: {
    type: Number,
    default: 250,
  },
});

const emit = defineEmits(["update:modelValue", "focus", 'isValid']);

const internalValue = ref<string>(props.modelValue || "");
const isFocused = ref<boolean>(false);

function handleFocus() {
  isFocused.value = true;
  emit("focus");
}
const isValid = computed(() => internalValue.value.length > props.maxSymbols);
const characterCount = computed(() => `${internalValue.value.length} из ${props.maxSymbols} символов`);

watch(internalValue, (newValue) => {
  emit("update:modelValue", newValue);
});

watch(() => props.modelValue, (newValue) => {
  internalValue.value = newValue;
});

watch(isValid, (newValue) => {
  emit("isValid", newValue);
});


</script>

<template>
  <div class="textarea-container">
    <textarea
        v-model="internalValue"
        @focus="handleFocus"
        @blur="isFocused = false"
        :class="{ expanded: isFocused || internalValue, 'over-limit': isValid, 'focus': (isFocused || internalValue) && !isValid}"
        class="textarea"
        :placeholder="placeholder"
    />
    <div v-if="isFocused" class="character-count" :class="{ 'over-limit': isValid }">
      {{ characterCount }}
    </div>
  </div>
</template>

<style scoped lang="scss">
.textarea-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
}

.textarea {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #c4c4c4;
  border-radius: 4px;
  resize: none;
  overflow: hidden;
  transition: height 0.3s ease, border-color 0.3s ease;
  height: 40px;
  box-sizing: border-box;
  font-size: 14px;
  line-height: 20px;

  &::placeholder {
    color: #a1a1a1;
  }

  &.expanded {
    height: 100px;
  }

  &.focus {
    border-color: #007bff;
  }

  &.over-limit {
    outline: #ff4d4f 2px solid !important;
  }
}

.character-count {
  margin-top: 4px;
  font-size: 12px;
  color: #6c757d;

  &.over-limit {
    color: #ff4d4f;
  }
}
</style>