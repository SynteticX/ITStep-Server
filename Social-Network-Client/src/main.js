import { createApp } from 'vue'
import { createMemoryHistory, createRouter } from 'vue-router';
import { createPinia } from 'pinia';
import VueCookie from "vue-cookies";
import './style.css'
import App from './App.vue'

const routes = [
    { path: "/", name: "Main", component: App }
];

const router = createRouter({
    history: createMemoryHistory(),
    routes
})

const pinia = createPinia();

createApp(App).use(router).use(pinia).use(VueCookie).mount('#app');
