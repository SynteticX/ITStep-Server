<template>
    <div class="container">
      <div class="card">
        <div class="card-body">
          <label for="" class="form-label">Логин</label>
          <input class="form-control" type="text" name="login" v-model="login" placeholder="Логин">
          <label for="" class="form-label">Пароль</label>
          <input class="form-control" type="password" name="password" v-model="password" placeholder="Пароль">
          <button @click="handleClick" class="mt-3 btn btn-primary">Войти</button>
        </div>
        <button @click="register">Зарегистрироваться</button>
      </div>
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
// Переадресация на регистрацию
const register = () => {
  router.push("/register");
}
</script>