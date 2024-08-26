<template>
  <button
      :class="[
      baseClasses,
      sizeClasses,
      variantClasses,
      { 'opacity-50 cursor-not-allowed': disabled }
    ]"
      :disabled="disabled"
      @click="handleClick"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import {defineProps, defineEmits, computed} from "vue";

const props = defineProps({
  variant: {
    type: String,
    default: "primary",
    validator: (value: string) => ["primary", "secondary", "danger"].includes(value),
  },
  size: {
    type: String,
    default: "md",
    validator: (value: string) => ["sm", "md", "lg"].includes(value),
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["click"]);

const baseClasses = "inline-flex items-center justify-center font-semibold rounded-[6px] focus:outline-none transition";

const sizeClasses = computed(() => {
  switch (props.size) {
    case "sm":
      return "px-3 py-1.5 text-sm";
    case "lg":
      return "px-5 py-3 text-lg";
    default:
      return "px-4 py-2 text-md";
  }
});

const variantClasses = computed(() => {
  switch (props.variant) {
    case "secondary":
      return "bg-gray-500 text-white hover:bg-gray-600";
    case "danger":
      return "bg-red-500 text-white hover:bg-red-600";
    default:
      return "bg-blue-500 text-white hover:bg-blue-600";
  }
});

function handleClick(event: MouseEvent) {
  if (!props.disabled) {
    emit("click", event);
  }
}
</script>
