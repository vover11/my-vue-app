<template>
    <div class="gallery">
        <h2>Галерея изображений</h2>
        <div class="main-image">
            <img :src="images[currentIndex]" :alt="'Image ' + (currentIndex + 1)">
        </div>
        <div class="thumbnails">
            <img v-for="(img, index) in images" :key="index" :src="img" @click="currentIndex = index"
                :class="{ active: currentIndex === index }">
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const images = [
    'https://picsum.photos/id/10/800/400',
    'https://picsum.photos/id/11/800/400',
    'https://picsum.photos/id/12/800/400',
    'https://picsum.photos/id/13/800/400'
]

const currentIndex = ref(0)
</script>

<style scoped>
.gallery {
    margin-top: 30px;
}

.main-image img {
    max-width: 100%;
    height: auto;
    border: 1px solid #ddd;
}

.thumbnails {
    display: flex;
    margin-top: 10px;
    gap: 5px;
}

.thumbnails img {
    width: 50px;
    height: 50px;
    object-fit: cover;
    cursor: pointer;
    border: 2px solid transparent;
}

.thumbnails img.active {
    border-color: #42b983;
}
</style>