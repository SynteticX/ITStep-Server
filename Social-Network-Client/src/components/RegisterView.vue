<template>
    <div class="container">
      <div class="card">
        <div class="card-body">
          <label for="" class="form-label">Логин</label>
          <input class="form-control" type="text" name="login" v-model="login" placeholder="Логин" @change="checkUsername">
          <p style="color: red">{{ login_err }}</p>
          <label for="" class="form-label">Пароль</label>
          <input class="form-control" type="password" name="password" v-model="password" placeholder="Пароль">
          <label for="" class="form-label">Повторите пароль</label>
          <input class="form-control" type="password" name="repeat_password" v-model="repeat_password" placeholder="Повторите пароль">
          <button @click="doRegister" class="mt-3 btn btn-primary" :disabled="!validPasswords">Зарегистрироваться</button>
        </div>
      </div>
    </div>
</template>

<script setup>
    import { ref, computed } from 'vue';
    import useAuthStore from '../store/authStore';
    import { useRouter } from "vue-router";

    const authStore = useAuthStore();

    const login = ref("");
    const password = ref("");
    const repeat_password = ref("");
    const login_err = ref("");

    const router = useRouter();

    const checkUsername = async () => {
        const user = await authStore.getUser(login.value);
        if (user.message.length > 0) {
            login_err.value = "Это имя пользователя уже занято!"
        } else {
            login_err.value = "";
            
        }
    }

    // Сравниваем поля для ввода пароля
    const validPasswords = computed(() => {
        // Проверяем введены ли пароли
        if (password.value && repeat_password.value) {
            // Проверка на длину пароля
            if (password.value.length >= 6) {
                return password.value === repeat_password.value;
            }
        }
        
        return false;
    })

    // Вызываем fetch регистрации
    const doRegister = async () => {
        const isRegistered = await authStore.registerUser(login.value, password.value);
        if (isRegistered === true) {
            // Переадресация при успешной регистрации
            router.push("/");
        } else {
            // Вывод popup
        }
    }
</script>