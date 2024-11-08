<!-- CardGrid.vue -->
<template>
    <div class="grid-container">
        <Card v-for="(value, index) in values" :key="index" :name="value.name" :address="value.address"
            :description="value.description" :image="value.image" />
    </div>
</template>

<script setup>
import { ref } from 'vue';
import Card from '../component/CardLight.vue';
import NoImage from '/images/NoImage.png'

const values = ref([
    {
        name: '캠핑장 이름 1',
        address: '주소 1',
        description: '설명 1',
        image: NoImage,
        id: 1
    },
    {
        name: '캠핑장 이름 2',
        address: '주소 2',
        description: '설명 2',
        image: NoImage,
        id: 2
    },
    {
        name: '캠핑장 이름 3',
        address: '주소 3',
        description: '설명 3',
        image: NoImage,
        id: 3
    },
    {
        name: '캠핑장 이름 4',
        address: '주소 4',
        description: '설명 4',
        image: NoImage,
        id: 4
    },
    {
        name: '캠핑장 이름 5',
        address: '주소 5',
        description: '설명 5',
        image: NoImage,
        id: 5
    },
    {
        name: '캠핑장 이름 6',
        address: '주소 6',
        description: '설명 6',
        image: NoImage,
        id: 6
    },
    {
        name: '캠핑장 이름 7',
        address: '주소 7',
        description: '설명 7',
        image: NoImage,
        id: 7
    },
]);
</script>

<style scoped>
.grid-container {
  width: 100%;
    max-width: 1000px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 3rem;
    padding: 50px 100px;
}
</style>
