import {AlertType} from "@/store/alerts/types.ts";
import {useAlertsStore} from "../../../store/alerts";
import {AlertTypesEnum} from "../../../store/alerts/types.ts";

export function initAlert(message: string, type: AlertTypesEnum = 'error') {
    const alertStore = useAlertsStore()

    alertStore.initAlert({
        message,
        type: type,
        isOpen: true
    })
}