import { defineStore } from "pinia";
import { ref, watch } from "vue";
import VueCookie from "vue-cookies";
import useAuthStore from "./authStore";

const useMainStore = defineStore('main', () => {
    const authStore = useAuthStore();

    const token = ref(authStore.getTokenFromCookie());
    const user = ref(JSON.parse(localStorage.getItem("user")));

    // Отслеживаем токен и обновляем его в куки
    watch(token, (newValue, oldValue) => {
        // Записываем токен в куки
        VueCookie.set("token", newValue, 60 * 60);
    });

    watch(user, (newValue, oldValue) => {
        console.log(111111111)
        // Записываем инфу о пользователе в localStorage
        localStorage.setItem("user", JSON.stringify(newValue));
    }, {deep: true});

    const API = "http://localhost:3000/"

    return { token, user, API };
});

export default useMainStore;