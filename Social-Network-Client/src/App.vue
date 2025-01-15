<script setup>
import { ref } from "vue";
import mainStore from "./store/store";
import useAuthStore from "./store/authStore";

  const store = mainStore();
  const authStore = useAuthStore();

  const login = ref("");
  const password = ref("");
  console.log(authStore.getTokenFromCookie());

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
