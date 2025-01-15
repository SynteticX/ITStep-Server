import { defineStore } from "pinia";
import { ref } from "vue";

const useMainStore = defineStore('main', () => {
    const token = ref("");
    const user = ref({});

    const API = "http://localhost:3000/"

    const handleAuth = async (login, password) => {

        console.log("Auth login: " + login)
        console.log("Auth pass: " + password)

        const query = {
            login: login,
            password: password
        }

        const response = await fetch(API + "auth/login", {
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

        if (response.status && response.status == 200) {
            console.log(data);
        }
        if (response.status && response.status == 400) {
            console.log(data);
        }
        if (response.status && response.status == 500) {
            console.log(data);
        }


    }

    return { token, user, handleAuth };
});

export default useMainStore;