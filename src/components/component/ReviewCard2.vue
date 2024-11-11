<template>
  <div class="review-card2">
    <div class="card-content">
      <h3 class="card-title">{{ title }}</h3>
      <p class="card-body">{{ content }}</p>
    </div>
    <div class="card-footer">
      <span class="card-date">{{ date }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ReviewCard2',
  props: {
    title: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    date: {
      type: String,
      required: true
    }
  }
};
</script>

<style scoped>
.review-card2 {
  padding: 16px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.2s;
  cursor: pointer;
  width: 100%;
  display: flex;
  flex-direction: column;
}

.review-card2:hover {
  transform: translateY(-5px);
  box-shadow: 0px 6px 15px rgba(0, 118, 182, 0.3);
  transition: box-shadow 0.3s ease-in-out;
}

.card-title {
  font-weight: bold;
  padding-bottom: 3px;
}

.card-body {
  color: #666;
}

.card-footer {
  text-align: right;
  font-size: 0.6rem;
  color: #999;
}
</style>
