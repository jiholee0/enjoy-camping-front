<!-- CardGrid.vue -->
<template>
    <div class="pagination">
      <ButtonLight class="button" @click="prevPage" :disabled="currentPage === 1" label="이전" />
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <ButtonLight class="button" @click="nextPage" :disabled="currentPage === totalPages" label="다음" />
    </div>

  <div class="grid-container">
    <Card v-for="(attraction, index) in attractions" :key="index" v-bind="attraction" />
  </div>
</template>

<script setup>
import Card from '@/components/card/AttractionCard.vue';
import ButtonLight from '@/components/button/ButtonLight.vue';

// Props로 데이터를 전달받음
const props = defineProps({
  attractions: { type: Array, required: true },
  totalPages: { type: Number, required: true },
  currentPage: { type: Number, required: true },
});

// 페이지 변경 시 부모 컴포넌트로 이벤트 발생
const emit = defineEmits(['change-page']);

const nextPage = () => {
  if (props.currentPage < props.totalPages) {
    emit('change-page', props.currentPage + 1);
  }
};

const prevPage = () => {
  if (props.currentPage > 1) {
    emit('change-page', props.currentPage - 1);
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
  font-size: 0.8rem;
}

.button {
  margin-right: 0px !important;
}

button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}
</style>
