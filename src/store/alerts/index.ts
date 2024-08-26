import {AlertType} from "./types.ts";
import { defineStore } from "pinia";
import {ref} from 'vue';

export const useAlertsStore = defineStore("alertsStore", () => {

    const alert = ref<AlertType>({
        isOpen: false,
        message: '',
        type: 'error'
    });


    function initAlert(data: AlertType): void {
        alert.value = data;
    }

    return {
        alert,
        initAlert
    }
});