import { defineStore } from "pinia";
import { ref, watch } from "vue";
import VueCookie from "vue-cookies";
import useMainStore from "./store";

const usePostStore = defineStore("posts", () => {
    const store = useMainStore();
    const posts = ref([]);

    // Запрос для получения всех постов
    const getAllPosts = async () => {
        const response = await fetch(store.API + "api/posts");

        if (!response.ok) {
            console.log("Ошибка при запросе!")
        }

        if (response.status && response.status == 200) {
            const data = await response.json();
            console.log(data);
            posts.value = data.message;
            return data;
        }

        if (response.status && (response.status == 400 || response.status == 500)) {
            console.log("Ошибка при запросе!")
            return null;
        }
    }

    const sendPost = async (data) => {
        const { text, img } = data;
        const userId = store.user.id;

        console.log({ userId, text, img })

        const response = await fetch(store.API + "api/addpost", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + store.token
            },
            body: JSON.stringify({ userId, text, img })
        });

        if (!response.ok) {
            console.log("Ошибка при выполнении запроса!");
        }

        if (response) {
            console.log(response);
            const data = await response.json();

            // if (data.status == 200)
        }

    }

    const likePost = async (postId) => {
        const userId = store.user.id;

        const response = await fetch(store.API + "api/likepost", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + store.token
            },
            body: JSON.stringify({ userId, postId })
        });

        if (!response.ok) {
            console.log("Ошибка при выполнении запроса!");
        }

        if (response) {
            console.log(response);
            const data = await response.json();
            if (data) {
                return true;
            }
        }
    }

    return { posts, getAllPosts, sendPost };
});

export default usePostStore;