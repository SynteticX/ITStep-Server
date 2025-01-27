<template>
    <div class="container ">
        <div>
            <div class="d-flex gap-1">
                <button @click="handleClick()" class="btn btn-info"><i class="fas fa-sync-alt"
                        style="color: white"></i></button>
                <button @click="router.push('/sendpost')" class="btn btn-success"><i class="fas fa-plus"></i></button>
            </div>

            <div class="d-flex" v-for="(post) in posts">
                <div class="card w-100 my-2">
                    <div class="card-body d-flex justify-content-between">
                        <span>Автор: {{ post.author }}</span>
                        <span>Дата: {{ getDate(post.datetime) }}</span>
                    </div>
                    <img :src="post.img" class="card-img-top my-2" style="border-radius: 20px;" alt="">
                    <div class="card-body border border-primary rounded">
                        {{ post.text }}
                    </div>
                    <div class="d-flex mt-2">
                        <button class="btn btn-primary"><i class="fas fa-heart"></i> {{ (post.likes) ? post.likes : 0 }}</button>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import usePostStore from '../store/postStore';
import { useRouter } from 'vue-router';

const router = useRouter();
const postStore = usePostStore();

onMounted(async () => {
    await postStore.getAllPosts();
});

const posts = ref(postStore.posts);
watch(postStore, (newValue, oldValue) => {
    posts.value = newValue.posts;
}, { deep: true });

const handleClick = async () => {
    await postStore.getAllPosts();
}

const getDate = (rawDate) => {
    console.log(rawDate)
    if (rawDate) {
        const date = new Date(Date.parse(rawDate));
        return date.toDateString();
    }
}
</script>