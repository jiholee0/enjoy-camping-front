<template>
  <div class="view-campsites">
    <!-- 좌측: 캠핑장 검색 -->
    <div class="section-left" :class="{ 'expanded': !selectedCampsite }">
      <!-- 검색 헤더 -->
      <div class="header">
        <h2>리뷰할 캠핑장 선택하기</h2>
      </div>

      <!-- 검색 필터 -->
      <div class="filters-container">
        <div class="select-group">
          <SelectBox
            :options="regionOptions"
            placeholder="시/도 선택"
            v-model="selectedRegion"
            @update:modelValue="onRegionChange"
          />
          <SelectBox
            :options="districtOptions"
            placeholder="구/군 선택"
            v-model="selectedDistrict"
            :key="selectedRegion"
          />
        </div>
        <div class="search-container">
          <SearchBar
            class="search-bar"
            label="캠핑장 검색하기"
            @search="onSearch"
            v-model="searchQuery"
          />
          <ButtonDark
            class="search-button"
            @click.capture="onSearch"
            label="검색"
          />
        </div>
      </div>

      <!-- 검색 결과 리스트 -->
      <div class="campsite-list">
        <div v-if="campings.length > 0" class="list-container">
          <div
            v-for="camping in campings"
            :key="camping.id"
            class="list-item"
            @click="selectedCampsite = camping"
          >
            <h3>{{ camping.name }}</h3>
            <p>{{ camping.detailAddress }}</p>
          </div>

          <div class="pagination">
            <ButtonLight
              class="button"
              @click.capture="prevPage"
              :disabled="currentPage === 1"
              label="이전"
            />
            <span>Page {{ currentPage }} of {{ totalPages }}</span>
            <ButtonLight
              class="button"
              @click.capture="nextPage"
              :disabled="currentPage === totalPages"
              label="다음"
            />
          </div>
        </div>
        <p v-else class="no-results">검색 결과가 없습니다.</p>
      </div>
    </div>

    <!-- 우측: 리뷰 작성 -->
    <div class="section-right" :class="{ 'expanded': selectedCampsite }">
      <div v-if="selectedCampsite" class="review-form">
        <ButtonLight class="back-button" @click.capture="handleBackButton" label="← 다른 캠핑장 선택하기" />
        <div class="campsite-content-row">
          <h2>{{ selectedCampsite.name }}</h2>
          <p class="p1">{{ selectedCampsite.detailAddress }}</p>
        </div>
        <div class="campsite-content-col">
          <p class="p2">{{ selectedCampsite.introduction }}</p>
        </div>


        <!-- 리뷰 제목 -->
        <input
          type="text"
          v-model="reviewTitle"
          placeholder="리뷰 제목을 입력해주세요"
          class="input"
        />

        <!-- 리뷰 내용 에디터 -->
        <TipTapEditor
          v-model="reviewContent"
          class="editor"
        />

        <!-- 제출 버튼 -->
        <ButtonDark
          @click.capture="submitReviewHandler"
          label="리뷰 등록하기"
          :disabled="!isValidForm"
          class="submit-button"
        />
      </div>
      <div v-else class="placeholder">
        <p>👈 왼쪽에서 캠핑장을 선택해주세요.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import { getCampsites } from '@/api/campsiteApi.js';
import {  getSidos, getGuguns } from '@/api/sidogugunApi.js'
import { getPresignedUrl, uploadImageToS3 } from '@/api/reviewApi.js';
import SearchBar from '@/components/search/SearchBar.vue';
import SelectBox from '@/components/filter/SelectBox.vue';
import ButtonDark from '@/components/button/ButtonDark.vue';
import TipTapEditor from '@/components/editor/TipTapEditor.vue';
import ButtonLight from '@/components/button/ButtonLight.vue';
import Swal from 'sweetalert2';

const router = useRouter();

const searchQuery = ref('');
const selectedRegion = ref('');
const selectedDistrict = ref('');
const regionOptions = ref([]);
const districtOptions = ref([]);
const campings = ref([]);
const selectedCampsite = ref(null);
const reviewTitle = ref('');
const reviewContent = ref('');
const reviewImages = ref([]);
const currentPage = ref(1);
const itemsPerPage = 9;
const totalItems = ref(0);

const totalPages = computed(() => Math.ceil(totalItems.value / itemsPerPage));
const isValidForm = computed(() => selectedCampsite.value && reviewTitle.value.trim() && reviewContent.value.trim() && reviewContent.value.trim() !== '<p></p>');

const fetchCampings = async (page = 1) => {
  try {
    const response = await getCampsites({
      keyword: searchQuery.value,
      sido: selectedRegion.value,
      gugun: selectedDistrict.value,
      pageNo: page,
      pageCnt: itemsPerPage,
    });
    campings.value = response.data.result;
    totalItems.value = response.data.totalCount;
  } catch (error) {
    console.error("캠핑장 데이터를 불러오는 중 오류가 발생했습니다:", error);
  }
};

const fetchRegionOptions = async () => {
  try {
    const response = await getSidos();
    regionOptions.value = response.data.result.map(sido => ({
      value: sido.sidoCode,
      label: sido.sidoName,
    }));
  } catch (error) {
    console.error("시/도 데이터를 불러오는 중 오류가 발생했습니다:", error);
  }
};

const fetchDistrictOptions = async (sidoCode) => {
  try {
    const response = await getGuguns(sidoCode);
    districtOptions.value = response.data.result.map(gugun => ({
      value: gugun.gugunCode,
      label: gugun.gugunName,
    }));
  } catch (error) {
    console.error("구/군 데이터를 불러오는 중 오류가 발생했습니다:", error);
  }
};

const onRegionChange = async (value) => {
  selectedDistrict.value = '';
  districtOptions.value = [];
  if (value) await fetchDistrictOptions(value);
};

// watch를 사용하여 selectedRegion이 빈 값일 때 처리
watch(selectedRegion, (newValue) => {
  if (!newValue) {
    selectedDistrict.value = '';
    districtOptions.value = [];
  }
});

// 검색 버튼 클릭 시 호출되는 함수
const onSearch = () => {
  currentPage.value = 1; // 검색 시 페이지 초기화
  fetchCampings(1);
};

const handleBackButton = () => {
  selectedCampsite.value = null;
};

const submitReviewHandler = async () => {
  if (!isValidForm.value) return;

  try{
   // 이미지 업로드 및 URL 수집
   const uploadedImageUrls = [];
    for (const image of reviewImages.value) {
      const presignedUrl = await getPresignedUrl(image.name);
      const uploadedUrl = await uploadImageToS3(presignedUrl, image);
      uploadedImageUrls.push(uploadedUrl);
    }

    // 리뷰 데이터 제출
    const reviewData = {
      campingId: selectedCampsite.value.id,
      title: reviewTitle.value,
      content: reviewContent.value,
      reviewImageList: uploadedImageUrls,
    };

    console.log('리뷰 : ', reviewData);
    // await submitReview(reviewData);

    Swal.fire({
    title: '리뷰 제출 완료',
    text: '리뷰가 성공적으로 제출되었습니다.',
    icon: 'success',
    confirmButtonText: '확인',
    confirmButtonColor: '#0077b6',
  }).then((result) => {
    if (result.isConfirmed) {
      router.push('/'); // 리뷰보기 화면으로
    }
  });
  } catch (error) {
    console.error('리뷰 제출 과정에서 오류가 발생했습니다:', error);
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
    fetchCampings(currentPage.value);
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    fetchCampings(currentPage.value);
  }
};

onMounted(() => {
  fetchRegionOptions();
  fetchCampings();
});
</script>

<style scoped>
.view-campsites {
  display: flex;
  flex-direction: row;
  min-height: 100vh;
  background-color: #f9fafb;
  padding: 40px;
  gap: 40px;
}

.section-left {
  width: 40%;
  transition: width 0.3s ease;
  border-right: 1px solid #e5e7eb;
  padding: 24px;
  background-color: #ffffff;
  border-radius: 8px;
}

.section-left.expanded {
  width: 60%;
}

.section-right {
  width: 40%;
  transition: width 0.3s ease;
  padding: 24px;
  background-color: #ffffff;
  border-radius: 8px;
}

.section-right.expanded {
  width: 60%;
}

.header h2 {
  font-size: 1.3rem;
  font-weight: bold;
  margin-bottom: 24px;
}

.search-container {
  display: flex; /* flex를 활성화 */
  flex-direction: row; /* 가로 정렬 */
  align-items: center; /* 세로 중앙 정렬 */
  gap: 8px; /* 검색 바와 버튼 사이 간격 */

}

.search-bar {
  flex: 1;
  width: 70% !important;
  max-width: 300px;
  min-width: 90%;
  padding: 0 !important;
  margin: 0 0 24px !important;
  align-self: center;
}

.search-button {
  margin: 0 0 24px !important;
}

.select-group {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

.campsite-list {
  gap: 16px;
  display: flex;
  flex-direction: column;
  align-self: flex-start !important;
  font-size: 0.7rem;
}

.list-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.list-item {
  padding: 5px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.list-item:hover {
  background-color: #f3f4f6;
  transform: translateY(-2px);
}

.list-item h3 {
  font-size: 0.9rem;
  font-weight: 500;
  margin-bottom: 8px;
}

.list-item p {
  color: #666;
  font-size: 0.7rem;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  margin-top: 24px;
  padding: 16px 0;
}

.pagination span {
  font-size: 0.9rem;
  color: #666;
}

.no-results {
  text-align: center;
  color: #666;
  padding: 24px;
  font-size: 0.9rem;
}

.campsite-content-row {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.review-form {
  padding: 24px;
}

.review-form h2 {
  font-size: 1.3rem;
  padding: 10px;
  font-weight: 600;
}

.review-form .p1 {
  font-size: 0.8rem;
  color: #767676;
  padding-top: 10px;
}

.review-form .p2 {
  font-size: 0.8rem;
  padding: 10px;
  margin-bottom: 8px;
}

.input {
  width: 100%;
  padding: 12px;
  margin-bottom: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.editor {
  min-height: 200px;
  margin-bottom: 24px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.back-button:hover {
  color: #111827;
}

.submit-button:disabled {
  background-color: #81c3d7;
  cursor: not-allowed;
}

.placeholder {
  height: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  color: #666;
  font-size: 0.9rem;
}
</style>
