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

    return { posts, getAllPosts };
});

export default usePostStore;