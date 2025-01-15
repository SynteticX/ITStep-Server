<script setup>
import { ref } from "vue";
import mainStore from "./store/store";

  const store = mainStore();

  const login = ref("");
  const password = ref("");

  const handleClick = async () => {
    await store.handleAuth(login.value, password.value);
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
