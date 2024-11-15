<template>
  <div class="detail-info">
    <div>
      <h2 class="h2">{{ name }}</h2>
      <p class="p1" v-if="description">{{ description }}</p>
      <p class="p2" v-if="tel">{{ tel }}</p>
      <p class="p2" v-if="addr">{{ addr }}</p>
    </div>
    <ButtonDark v-if="link" @click.capture="openLink" class="website-button" label="웹사이트로 이동하기 🔗" />
  </div>
</template>

<script setup>
import ButtonDark from '@/components/button/ButtonDark.vue';
import { defineProps } from 'vue';

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  tel: {
    type: String,
    required: true,
  },
  addr: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
});

function openLink() {
  window.open(props.link, "_blank");
}
</script>

<style scoped>
.detail-info {
  background-color: rgba(255, 255, 255, 0.7);
  padding: 20px 60px;
  height: 200px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.h2 {
  font-weight: bold;
  font-size: 1.7rem;
  margin: 0;
}

.p1 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  margin: 4px 0;
  color: #454545;
  font-size: 1.2rem;
  padding-bottom: 10px;
  line-height: 1.5rem;
  max-height: calc(1.5rem * 2);
  overflow: hidden;
  word-break: keep-all;
  width: 80%;
}

.p2 {
  margin: 4px 0;
  color: #454545;
  font-size: 0.9rem;
}

.website-button {
  font-size: 0.8em;
  display: flex;
  align-self: flex-end;
  justify-content: flex-end;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>
