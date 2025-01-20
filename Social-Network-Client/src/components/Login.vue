<template>
    <div>
        <input type="text" name="login" v-model="login">
        <input type="password" name="password" v-model="password">
        <button @click="handleClick">Login</button>
    </div>
</template>

<script setup>
import { ref } from "vue";
import useAuthStore from "../store/authStore";

const authStore = useAuthStore();

const login = ref("");
const password = ref("");

const handleClick = async () => {
  await authStore.handleAuth(login.value, password.value);
}
</script>