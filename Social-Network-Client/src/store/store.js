import { defineStore } from "pinia";
import { ref, watch } from "vue";
import VueCookie from "vue-cookies";
import useAuthStore from "./authStore";

const useMainStore = defineStore('main', () => {
    const authStore = useAuthStore();

    const token = ref(authStore.getTokenFromCookie());
    const user = ref({});

    // Отслеживаем токен и обновляем его в куки
    watch(token, (newValue, oldValue) => {
        // Записываем токен в куки
        VueCookie.set("token", newValue, 60 * 60);
    });

    const API = "http://localhost:3000/"

    return { token, user, API };
});

export default useMainStore;