<script setup>
import { ref } from "vue";
import mainStore from "./store/store";
import useAuthStore from "./store/authStore";

const store = mainStore();
const authStore = useAuthStore();

// Проверяем наличие и валидность токена
if (!store.token) {
  console.log("Нужно авторизоваться!")
} else {
  const verifyToken = async function() {
    const result = await authStore.verifyToken()
    if (!result) {
      console.log(result)
    } else {
      console.log(result)
    }
  }();
}

const login = ref("");
const password = ref("");

const handleClick = async () => {
  await authStore.handleAuth(login.value, password.value);
}
</script>

<template>
  <div>
    <input type="text" name="login" v-model="login">
    <input type="password" name="password" v-model="password">
    <button @click="handleClick">Login</button>
  </div>
  <div>
    {{ store.user.name }}
  </div>
</template>
