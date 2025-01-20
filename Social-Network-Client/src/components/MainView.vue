<template>
    <div>
        <button @click="handleClick()">Update</button>

        <div v-for="(post) in posts">
            <div>
                Автор: {{ post.author }}
                Дата: {{ getDate(post.datetime) }}
                {{ post.text }}
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref, watch, onMounted } from 'vue';
    import usePostStore from '../store/postStore';
    const postStore = usePostStore();

    onMounted(async () => {
        await postStore.getAllPosts();
    });

    const posts = ref(postStore.posts);
    watch(postStore, (newValue, oldValue) => {
        posts.value = newValue.posts;
    }, {deep: true});

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