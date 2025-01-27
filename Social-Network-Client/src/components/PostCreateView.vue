<template>
    <div class="container card">
        <div>
            <label for="">Введите текст поста</label>
            <input type="text" class="form-control">
        </div>
        <div>
            <label for="">URL картинки</label>
            <input type="text" class="form-control">
        </div>
        <button @click="sendPost" class="btn btn-primary">Отправить</button>
    </div>
</template>

<script setup>
    import { ref } from 'vue';
import usePostStore from '../store/postStore';
    const postStore = usePostStore();

    const text = ref("");
    const img = ref("");

    const sendPost = () => {
        postStore.sendPost({ text, img });
    }
</script>