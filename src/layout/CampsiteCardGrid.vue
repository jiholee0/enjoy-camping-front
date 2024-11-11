<!-- CardGrid.vue -->
<template>
  <div class="grid-container">
    <Card v-for="(value, index) in paginatedItems" :key="index" v-bind="value" />
  </div>

  <div class="pagination">
    <ButtonLight class="button" @click="prevPage" :disabled="currentPage === 1" label="이전" />
    <span>Page {{ currentPage }} of {{ totalPages }}</span>
    <ButtonLight class="button" @click="nextPage" :disabled="currentPage === totalPages" label="다음" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import Card from '@/components/CardLight.vue';
import NoImage from '/images/NoImage.png';
import ButtonLight from '@/components/ButtonLight.vue';

const values = [
  {
    name: '캠핑장 이름 1',
    address: '주소 1',
    description: '설명 1',
    image: NoImage,
    id: 1,
    type: 'campings'
  },
  {
    name: '캠핑장 이름 2',
    address: '주소 2',
    description: '설명 2',
    image: NoImage,
    id: 2,
    type: 'campings'
  },
  {
    name: '캠핑장 이름 3',
    address: '주소 3',
    description: '설명 3',
    image: NoImage,
    id: 3,
    type: 'campings'
  },
  {
    name: '캠핑장 이름 4',
    address: '주소 4',
    description: '설명 4',
    image: NoImage,
    id: 4,
    type: 'campings'
  },
  {
    name: '캠핑장 이름 5',
    address: '주소 5',
    description: '설명 5',
    image: NoImage,
    id: 5,
    type: 'campings'
  },
  {
    name: '캠핑장 이름 6',
    address: '주소 6',
    description: '설명 6',
    image: NoImage,
    id: 6,
    type: 'campings'
  },
  {
    name: '캠핑장 이름 7',
    address: '주소 7',
    description: '설명 7',
    image: NoImage,
    id: 7,
    type: 'campings'
  },
  {
    name: '캠핑장 이름 8',
    address: '주소 8',
    description: '설명 8',
    image: NoImage,
    id: 8,
    type: 'campings'
  },
  {
    name: '캠핑장 이름 9',
    address: '주소 9',
    description: '설명 9',
    image: NoImage,
    id: 9,
    type: 'campings'
  },
  {
    name: '캠핑장 이름 10',
    address: '주소 10',
    description: '설명 10',
    image: NoImage,
    id: 10,
    type: 'campings'
  },
];

const currentPage = ref(1);
const itemsPerPage = ref(9);

const totalPages = computed(() => Math.ceil(values.length / itemsPerPage.value));

const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;

  return values.slice(start, end).map((value) => ({
    ...value,
  }));
});

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};
</script>

<style scoped>
.grid-container {
  max-width: 1000px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 3rem;
  padding: 50px 100px;
}

span {
  font-size: 0.8rem;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: center;
}

.button {
  margin-right: 0px !important;
}

button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}
</style>
