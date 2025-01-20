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
</script>

<template>
  <router-link to="/">Main</router-link>
  <router-link to="/login">Login</router-link>
  <router-view></router-view>
</template>
