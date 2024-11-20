<template>
  <div class="review-detail-container">
    <div>
      <!-- 뒤로가기 버튼 -->
      <ButtonLight class="back-button" @click.capture="handleBackButton" label="← 목록으로 돌아가기" />
    </div>

    <!-- 로딩 상태 -->
    <div v-if="loading" class="loading">
      로딩 중...
    </div>

    <!-- 리뷰 상세 내용 -->
    <div v-else-if="review" class="review-card">
      <div class="review-header">
        <h1 class="review-title">{{ review.title }}</h1>

        <div class="review-meta">
          <div class="meta-item">
            <i class="fas fa-user"></i>
            <span>작성자 ID: {{ review.writerId }}</span>
          </div>
          <div class="meta-item">
            <i class="fas fa-map-marker-alt"></i>
            <span>{{ review.sidoName }} {{ review.gugunName }}</span>
          </div>
          <div class="meta-item camping-id">
            캠핑장 ID: {{ review.campingId }}
          </div>
        </div>
      </div>

      <div class="review-content">
        <editor-content :editor="editor" class="prose prose-sm max-w-none" />
      </div>
    </div>

    <!-- 에러 메시지 -->
    <div v-else class="error-message">
      리뷰를 불러오는데 실패했습니다.
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getReviewDetail } from '@/api/reviewApi';
import { getSido, getGugun } from '@/api/sidogugunApi';

import ButtonLight from '@/components/button/ButtonLight.vue';

import { Editor, EditorContent } from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';

const route = useRoute();
const router = useRouter();
const review = ref(null);
const loading = ref(true);
const editor = ref(null);

// 리뷰 데이터 불러오기
const fetchReviewDetail = async () => {
  try {
    const response = await getReviewDetail(route.params.id);
    review.value = response.data.result;

    // sidoCode와 gugunCode를 가져오기
    const sidoCode = review.value.sidoCode;
    const gugunCode = review.value.gugunCode;

    // sidoName과 gugunName 가져오기
    const [sidoResponse, gugunResponse] = await Promise.all([
      getSido(sidoCode),
      getGugun(sidoCode, gugunCode),
    ]);

    // review.value에 sidoName과 gugunName 추가
    review.value.sidoName = sidoResponse.data.result.sidoName;
    review.value.gugunName = gugunResponse.data.result.gugunName;

    // 에디터 초기화
    editor.value = new Editor({
      extensions: [
        StarterKit,
        Image,
        Link.configure({
          openOnClick: false,
        })
      ],
      content: review.value.content,
      editable: false,
      editorProps: {
        attributes: {
          class: 'prose prose-sm max-w-none focus:outline-none',
        },
      },
    });

  } catch (error) {
    console.error('리뷰 데이터를 불러오는 데 실패했습니다.', error);
  } finally {
    loading.value = false;
  }
};

// 뒤로가기 함수
const handleBackButton = () => {
  router.push('./cam')
};

// 컴포넌트가 마운트될 때 데이터 불러오기
onMounted(() => {
  fetchReviewDetail();
});

// 컴포넌트가 언마운트되기 전에 에디터 정리
onBeforeUnmount(() => {
  if (editor.value) {
    editor.value.destroy();
  }
});
</script>

<style>
/* TipTap 에디터 스타일 */
.ProseMirror {
  > * + * {
    margin-top: 0.75em;
  }

  ul,
  ol {
    padding: 0 1rem;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    line-height: 1.1;
    margin-top: 1.5em;
    margin-bottom: 0.75em;
  }

  img {
    max-width: 100%;
    height: auto;
    display: block;
    margin: 1rem 0;
  }

  code {
    background-color: rgba(#616161, 0.1);
    border-radius: 0.25em;
    padding: 0.25em;
  }

  pre {
    background: #0D0D0D;
    color: #FFF;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;
    margin: 1rem 0;

    code {
      color: inherit;
      padding: 0;
      background: none;
    }
  }

  blockquote {
    padding-left: 1rem;
    border-left: 3px solid rgba(#0D0D0D, 0.1);
  }
}
</style>

<style scoped>
.review-detail-container {
  max-width: 800px;
  margin: 2rem auto;
  padding: 0 1rem;
}

.back-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #666;
  cursor: pointer;
  margin-bottom: 2rem;
  font-size: 0.9rem;
}

.loading {
  text-align: center;
  padding: 2rem;
  color: #666;
}

.review-card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 2rem;
}

.review-header {
  margin-bottom: 2rem;
  border-bottom: 1px solid #eee;
  padding-bottom: 1rem;
}

.review-title {
  font-size: 1.8rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 1rem;
}

.review-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  font-size: 0.9rem;
  color: #666;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.camping-id {
  background: #f5f5f5;
  padding: 0.2rem 0.6rem;
  border-radius: 4px;
}

.review-content {
  line-height: 1.6;
  color: #444;
}

.error-message {
  text-align: center;
  color: #dc3545;
  padding: 2rem;
}

/* 반응형 스타일 */
@media (max-width: 640px) {
  .review-detail-container {
    margin: 1rem auto;
  }

  .review-card {
    padding: 1rem;
  }

  .review-title {
    font-size: 1.5rem;
  }

  .review-meta {
    flex-direction: column;
    gap: 0.8rem;
  }
}
</style>
