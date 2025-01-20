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
import { useRouter } from "vue-router";

const router = useRouter();

const authStore = useAuthStore();

const login = ref("");
const password = ref("");

const handleClick = async () => {
  const response = await authStore.handleAuth(login.value, password.value);
  if (response === true) {
    router.push("/");
  }
}
</script>