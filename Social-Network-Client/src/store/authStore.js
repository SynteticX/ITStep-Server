import { defineStore } from "pinia";
import useMainStore from "./store";
import VueCookie from "vue-cookies";

const authStore = defineStore("auth", () => {
    const mainStore = useMainStore();

    const getTokenFromCookie = () => {
        // Вытаскиваем из куки токен
        const cookieValue = VueCookie.get("token");

        if (cookieValue && cookieValue !== undefined) {
            return cookieValue;
        } else {
            return null;
        }
    }

    const handleAuth = async (login, password) => {

        const query = {
            login: login,
            password: password
        }

        const response = await fetch(mainStore.API + "auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(query)
        })
        // .then(data => data.json())
        .catch(err => console.log("Ошибка при запросе: " + err));

        console.log(response);

        if (!response.ok) {
            console.log("Ошибка при запросе!")
        }
        const data = await response.json();

        // Успешная авторизация
        if (response.status && response.status == 200) {
            // Записываем в хранилище полученную информацию
            mainStore.token = data.token;
            mainStore.user = data.user;

            // Записываем токен в куки
            VueCookie.set("token", mainStore.token, 60 * 60);
        }
        // Неверный логин или пароль (или не введен)
        if (response.status && response.status == 400) {
            console.log(data);
        }
        // Ошибки при запросе на сервере
        if (response.status && response.status == 500) {
            console.log(data);
        }
    };

    const verifyToken = async () => {
        // Проверяем, валидный ли токен
        const response = await fetch(mainStore.API + "/auth/verifyToken", {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + mainStore.token
            },
            body: JSON.stringify({})
        })
    };

    return { handleAuth, getTokenFromCookie };
})

export default authStore;