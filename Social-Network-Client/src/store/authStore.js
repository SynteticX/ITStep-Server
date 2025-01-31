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

            return true;
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
        const response = await fetch(mainStore.API + "auth/verifyToken", {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + mainStore.token
            },
            body: JSON.stringify({})
        });

        if (response.status == 403) {
            // Если токен недействителен, удаляем токен
            mainStore.token = null;
            return null;
        }

        if (response.status == 200) {
            // const result = await response.json();
            // if (result.message == "OK") {
            //     return true;
            // }
            return true;
        }
    };

    const getUser = async (login) => {
        const response = await fetch(mainStore.API + "api/users/" + login);
        if (!response.ok) {
            console.log("Ошибка при запросе!")
        }
        const data = await response.json();
        return data;
    }

    // Регистрация
    const registerUser = async (login, password) => {
        const response = await fetch(mainStore.API + "auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ login, password })
        });

        if (!response.ok) {
            console.log("Ошибка при регистрации")
        }
        
        if (response && response.status == 200) {
            const data = await response.json();
            return await handleAuth(login, password);
        }
        
        if (response && response.status == 400) {
            const data = await response.json();
            return data;
        }
        if (response && response.status == 500) {
            const data = await response.json();
            return data;
        }
    }

    return { handleAuth, getTokenFromCookie, verifyToken, getUser, registerUser };
})

export default authStore;