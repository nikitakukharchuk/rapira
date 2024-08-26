<script setup lang="ts">
import { ref, watch } from 'vue';
import cross from "@/assets/images/icons/cross.vue";

const props = withDefaults(defineProps<{
  show: boolean
}>(), {
  show: false,
})

const emit = defineEmits(['close'])

const showModal = ref(false);
const modal = ref(null);

function closeModal() {
  emit('close');
}

watch(
    () => props.show,
    show => {
      showModal.value = show;
    },
);
</script>


<template>
  <teleport to="body">
    <transition
        enter-active-class="transition ease-out duration-200 transform"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition ease-in duration-200 transform"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
    >
      <div
          ref="modal-backdrop"
          class="fixed z-10 inset-0 overflow-y-auto bg-black bg-opacity-50 px-5"
          v-show="showModal"
      >
        <div
            class="flex items-start justify-center min-h-screen pt-24 text-center"
        >
          <transition
              enter-active-class="transition ease-out duration-300 transform "
              enter-from-class="opacity-0 translate-y-10 scale-95"
              enter-to-class="opacity-100 translate-y-0 scale-100"
              leave-active-class="ease-in duration-200"
              leave-from-class="opacity-100 translate-y-0 scale-100"
              leave-to-class="opacity-0 translate-y-10 translate-y-0 scale-95"
          >
            <div
                class="relative bg-white rounded-lg text-left max-h-[700px] overflow-y-scroll shadow-xl p-[15px]"
                role="dialog"
                ref="modal"
                aria-modal="true"
                v-show="showModal"
                aria-labelledby="modal-headline"
            >
              <button @click="closeModal" class="absolute top-5 right-4">
                <component :is="cross"/>
              </button>
              <slot></slot>
            </div>
          </transition>
        </div>
      </div>
    </transition>
  </teleport>
</template>


<style></style>