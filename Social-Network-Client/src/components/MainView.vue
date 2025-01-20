<template>
    <div>
        <button @click="handleClick()">CLICK</button>

        <div v-for="(post) in posts">
            <div>
                {{ post.text }}
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref, watch } from 'vue';
    import usePostStore from '../store/postStore';
    const postStore = usePostStore();

    const posts = ref(postStore.posts);
    watch(postStore.posts, (newValue, oldValue) => {
        console.log(postStore.posts);
        posts.value = postStore.posts;
    });

    const handleClick = async () => {
        await postStore.getAllPosts();
    }
</script>