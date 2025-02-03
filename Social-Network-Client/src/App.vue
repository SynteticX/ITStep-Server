<script setup>
import mainStore from "./store/store";
import useAuthStore from "./store/authStore";
import {useRouter} from 'vue-router';

const store = mainStore();
const authStore = useAuthStore();

// Вызываем роутер
const router = useRouter();

// Проверяем наличие и валидность токена
if (!store.token) {
  console.log("Нужно авторизоваться!")
  router.push({path: '/login', replace: true});
} else {
  const verifyToken = async function() {
    const result = await authStore.verifyToken()
    if (result !== true) {
      // Если токен просрочен, переадресуем на страницу Login
      router.push("/login");
    } else {
      // console.log(result)
    }
  }();
}
</script>

<template>
  <router-view></router-view>
</template>
