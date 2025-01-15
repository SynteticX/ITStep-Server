import { defineStore } from "pinia";
import { ref } from "vue";

const useMainStore = defineStore('main', () => {
    const token = ref("");
    const user = ref({});

    const API = "http://localhost:3000/"

    return { token, user, API };
});

export default useMainStore;