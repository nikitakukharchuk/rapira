<script lang="ts" setup>
import { computed } from "vue";
import {useAlertsStore} from "@/store/alerts";
import Modal from "@/components/shared/ui/Modal.vue";

const alertStore = useAlertsStore();

const alertInfo = computed(() => {
  return alertStore.alert
});

const images = {
  success: require('@/assets/images/gif/success.gif'),
  error: require('@/assets/images/gif/error.gif'),
  warning: require('@/assets/images/gif/question.gif'),
}


function closePopup() {
  alertStore.initAlert({
    isOpen: false,
    message: "",
    type: 'error'
  });
}
</script>

<template>
  <Modal @close="closePopup" :show="alertInfo.isOpen">
      <div>
        <img :src="images[alertInfo.type]" alt="image">
        <span>{{alertInfo.message}}</span>
      </div>
  </Modal>
</template>