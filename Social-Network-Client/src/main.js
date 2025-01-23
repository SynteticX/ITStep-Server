import { createApp } from 'vue'
import { createMemoryHistory, createRouter } from 'vue-router';
import { createPinia } from 'pinia';
import VueCookie from "vue-cookies";
import './style.css'
import App from './App.vue'
import MainView from './components/MainView.vue'
import Login from './components/Login.vue'
import RegisterView from './components/RegisterView.vue';

const routes = [
    { path: "/", component: MainView },
    { path: "/login", component: Login },
    { path: "/register", component: RegisterView }
];

const router = createRouter({
    history: createMemoryHistory(),
    routes
})

const pinia = createPinia();

createApp(App).use(router).use(pinia).use(VueCookie).mount('#app');
