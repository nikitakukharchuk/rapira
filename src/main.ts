import {createApp} from 'vue'
import './assets/styles/main.scss'
import App from './App.vue'
import router from "./router";
import { createPinia } from "pinia";

const pinia = createPinia()

const plugins = [router, pinia]
const app = createApp(App)

plugins.forEach((plugin) => {app.use(plugin)})

app.mount('#app')
