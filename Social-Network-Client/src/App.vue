<script setup>
  import mainStore from "./store/store";

  const store = mainStore();

  const handleClick = async () => {
    await store.handleAuth("Admin", "password");
  }
</script>

<template>
  <div>
    <button @click="handleClick">Login</button>
  </div>
</template>
