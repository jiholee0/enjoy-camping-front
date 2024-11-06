<!-- Card.vue -->
<template>
    <div class="card">
        <img :src="image" alt="이미지" class="card-image" />
        <div class="card-content">
            <h3>{{ name }}</h3>
            <p>{{ address }}</p>
            <p>{{ description }}</p>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    name: String,
    address: String,
    description: String,
    image: String,
});
</script>

<style scoped>
.card {
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    transition: transform 0.2s;
}

.card:hover {
    transform: translateY(-5px);
}

.card-image {
    width: 100%;
    height: auto;
    object-fit: cover;
    align-self: center;
}

.card-content {
    padding: 20px;
}

.card-content h3 {
    margin: 0;
    font-size: 0.9rem;
}

.card-content p {
    font-size: 0.6rem;
    margin: 5px 0;
    color: #666;
}
</style>