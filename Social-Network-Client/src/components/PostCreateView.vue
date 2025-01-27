<template>
    <div class="container card">
        <div>
            <label for="">Введите текст поста</label>
            <input type="text" class="form-control" v-model="text">
        </div>
        <div>
            <label for="">URL картинки</label>
            <input type="text" class="form-control" v-model="img">
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
        postStore.sendPost({ text: text.value, img: img.value });
    }
</script>