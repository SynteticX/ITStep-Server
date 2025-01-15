import { defineStore } from "pinia";
import useMainStore from "./store";

const authStore = defineStore("auth", () => {
    const handleAuth = async (login, password) => {

        const mainStore = useMainStore();

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

            const expiresTime = new Date();
            expiresTime.setTime(expiresTime.getTime() + 60 * 60 * 1000);
            document.cookie = `token=${mainStore.token};expires=${expiresTime.toUTCString()};path=/`;
        }
        // Неверный логин или пароль (или не введен)
        if (response.status && response.status == 400) {
            console.log(data);
        }
        // Ошибки при запросе на сервере
        if (response.status && response.status == 500) {
            console.log(data);
        }
    }

    return { handleAuth };
})

export default authStore;