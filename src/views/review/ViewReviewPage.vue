<template>
  <div class="view-review">
    <!-- 섹션 1: 캠핑장 검색 -->
    <div v-if="!selectedReview" class="section search" :class="{ 'expanded': !selectedCampsite }" ref="searchSection">
      <div class="header">
        <h2>캠핑장 선택하기</h2>
      </div>
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
      <div class="campsite-list">
        <div v-if="campings.length > 0" class="list-container">
          <div
            v-for="camping in campings"
            :key="camping.id"
            class="list-item"
          >
            <div class="list-item-content" @click="fetchReviewsForCampsite(camping)">
              <div>
                <h3>{{ camping.name }}</h3>
                <p>{{ camping.detailAddress }}</p>
              </div>
              <button
                class="info-button"
                @click.stop="navigateToDetail(camping.id)"
              >
                <img src="/images/info-icon.png" alt="Info" />
              </button>
            </div>
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

    <!-- 섹션 2: 리뷰 목록 -->
    <div class="section reviews"
         :class="{
           'expanded': selectedCampsite && !selectedReview,
           'left': selectedReview,
         }">
      <div v-if="selectedCampsite">
        <ButtonLight
          class="back-button"
          @click.capture="handleBackButton"
          label="← 캠핑장 선택으로 돌아가기"
        />
        <div class="review-header">
          <h2>{{ selectedCampsite.name }} 리뷰</h2>
          <span class="review-count">총 {{ reviews.length }}개의 리뷰</span>
        </div>
        <div v-if="reviews.length > 0" class="reviews-container">

          <div
            v-for="review in reviews"
            :key="review.id"
            class="review-card"
            @click.capture="selectReview(review)"
          >
            <div class="review-card-header">
              <h3 class="review-title">{{ review.title }}</h3>
              <span class="review-date">{{ formatDate(review.createdAt) }}</span>
            </div>
            <div class="review-card-content">
              <div class="review-preview" v-html="truncateContent(review.content)"></div>
            </div>
          </div>
        </div>
        <p v-else class="no-results">작성된 리뷰가 없습니다.</p>
      </div>
      <div v-else class="placeholder">
        <p>👈 왼쪽에서 캠핑장을 선택해주세요.</p>
      </div>
    </div>

    <!-- 섹션 3: 리뷰 상세 -->
    <div class="section detail"
         :class="{
           'expanded': selectedReview,
         }">
      <transition name="fade">
        <div v-if="selectedReview" class="review-detail">
          <ButtonLight
            class="back-button"
            @click.capture="selectedReview = null"
            label="← 리뷰 목록으로 돌아가기"
          />
          <div v-if="!isEditing">
            <h2>{{ selectedReview.title }}</h2>
            <p>{{ formatDate(selectedReview.createdAt) }}</p>
            <div class="review-content" v-html="selectedReview.content"></div>
            <!-- 우측 하단 버튼 -->
            <div v-if="canEdit" class="review-actions">
              <ButtonLight
                class="edit-button"
                @click.capture="startEditing"
                label="리뷰 수정하기"
              />
              <ButtonLight
                class="delete-button"
                @click.capture="deleteReviewAction(selectedReview.id)"
                label="리뷰 삭제하기"
              />
            </div>
          </div>
          <div v-else>
            <!-- 수정 중인 화면 -->
            <input
              type="text"
              v-model="editedReviewTitle"
              class="input"
            />
            <TipTapEditor
              v-model="editedReviewContent"
              class="editor"
            />
            <!-- 수정하기 및 취소하기 버튼 -->
            <div class="review-actions">
              <ButtonDark
                class="cancel-button"
                @click.capture="cancelEdit"
                label="수정 취소"
              />
              <ButtonDark
                class="save-button"
                @click.capture="saveEdit"
                label="수정 완료"
              />
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, inject } from 'vue';
import { useRouter } from 'vue-router';
import { getCampsites, getCampsiteDetail } from '@/api/campsiteApi.js';
import { getReviewByCampsite, updateReview, deleteReview, uploadImageToS3, createPresignedUrl } from '@/api/reviewApi.js'
import { getSidos, getGuguns } from '@/api/sidogugunApi.js';
import ButtonDark from '@/components/button/ButtonDark.vue';
import ButtonLight from '@/components/button/ButtonLight.vue';
import SearchBar from '@/components/search/SearchBar.vue';
import SelectBox from '@/components/filter/SelectBox.vue';
import TipTapEditor from '@/components/editor/TipTapEditor.vue';
import Swal from 'sweetalert2';
import { v4 as uuidv4 } from 'uuid';
import Compressor from 'compressorjs';

const searchQuery = ref('');
const selectedRegion = ref('');
const selectedDistrict = ref('');
const regionOptions = ref([]);
const districtOptions = ref([]);
const campings = ref([]);
const reviews = ref([]);
const selectedCampsite = ref(null);
const selectedReview = ref(null);

const isEditing = ref(false);
const editedReviewTitle = ref(selectedReview.value ? selectedReview.value.title : '');
const editedReviewContent = ref(selectedReview.value ? selectedReview.value.content : '');

const currentPage = ref(1);
const itemsPerPage = 9;
const totalItems = ref(0);

const totalPages = computed(() => Math.ceil(totalItems.value / itemsPerPage));

const userId = inject('userId');
const canEdit = ref(false);

const router = useRouter();

// 날짜 포맷팅 함수
const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  }).format(date);
};

const truncateContent = (content) => {
  if (!content) return '';
  // HTML 파싱
  const parser = new DOMParser();
  const doc = parser.parseFromString(content, 'text/html');
  const textContent = doc.body.textContent || '';

  // 100자 제한 후 HTML 유지
  const truncatedText = textContent.length > 100 ? textContent.substring(0, 100) + '...' : textContent;
  return truncatedText;
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
    currentPage.value = page;
  } catch (error) {
    console.error("캠핑장 데이터를 불러오는 중 오류가 발생했습니다:", error);
  }
};

const fetchReviewsForCampsite = async (camping) => {
  selectedCampsite.value = camping
  try {
    const response = await getReviewByCampsite(camping.id);
    reviews.value = response.data.result;
  } catch (error) {
    console.error("리뷰 데이터를 불러오는 중 오류가 발생했습니다:", error);
  }
};

const onRegionChange = async (value) => {
  selectedDistrict.value = '';
  districtOptions.value = [];
  if (value) await fetchDistrictOptions(value);
};

const searchSectionRef = ref(null);

const handleBackButton = () => {
  // 모든 상태 초기화
  selectedReview.value = null;
  selectedCampsite.value = null;
  reviews.value = [];

  // 검색 섹션이 숨겨져 있었다면 다시 표시
  if (searchSectionRef.value) {
    searchSectionRef.value.classList.remove('hidden');
  }
};

const selectReview = (review) => {
  selectedReview.value = review;
  isEditing.value = false;
  editedReviewTitle.value = review.title;
  editedReviewContent.value = review.content;
  canEdit.value = userId.value === review.writerId;

  // 검색 섹션 숨김 처리
  setTimeout(() => {
  if (searchSectionRef.value) {
    searchSectionRef.value.classList.add('hidden');
  }
  }, 300); // 리뷰 슬라이드 애니메이션이 끝난 후 검색 섹션 숨김
};


const navigateToDetail = (campingId) => {
  router.push(`/detail/campings/${campingId}`);
};

const onSearch = () => {
  currentPage.value = 1; // 검색 시 페이지 초기화
  fetchCampings(1);
};

const startEditing = () => {
  isEditing.value = true;
  editedReviewTitle.value = selectedReview.value.title;
  editedReviewContent.value = selectedReview.value.content;
};
const saveEdit = async () => {
  const loadingSwal = Swal.fire({
    title: '수정 중...',
    text: '리뷰를 수정하고 있습니다. 잠시만 기다려주세요.',
    icon: 'info',
    allowOutsideClick: false,
    showConfirmButton: false,
    didOpen: () => {
      Swal.showLoading(); // 로딩 애니메이션 활성화
    },
  });

  try {

    // 1. 에디터 내용에서 HTML 가져오기
    let editorContent = editedReviewContent.value;

    // 2. HTML 파싱하여 이미지 정보 추출
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = editorContent;
    const images = Array.from(tempDiv.querySelectorAll('img[src]'));

    // 이미지의 src와 크기 정보 수집
    const newReviewImages = images.map(img => ({
      src: img.src,
      width: img.style.width || '500px',
      height: img.style.height || 'auto',
      isNew: img.src.startsWith('blob:') || img.src.startsWith('data:image/')
    }));

    // 프리사인드 URL 요청 병렬화 (새로운 이미지만 처리)
    const presignedUrlPromises = newReviewImages
      .filter(imageInfo => imageInfo.isNew)
      .map(async (imageInfo) => {
        const img = images.find(imgElement => imgElement.src === imageInfo.src);
        if (!img) return null;

        const localSrc = img.src;
        const fileName = `image_${uuidv4()}`;
        const response = await fetch(localSrc);
        const blob = await response.blob();

        const compressedBlob = await compressImage(blob);

        const presignedUrlResponse = await createPresignedUrl(fileName, compressedBlob.type);
        return {
          presignedUrl: presignedUrlResponse.data.result,
          blob: compressedBlob,
          img,
          localSrc,
          imageInfo
        };
      });

    // 프리사인드 URL 요청 결과 처리
    const presignedUrlResults = await Promise.allSettled(presignedUrlPromises);

    // 이미지 업로드 병렬 처리 (새 이미지만)
    const imageUploadPromises = presignedUrlResults
      .filter(result => result.status === 'fulfilled' && result.value !== null)
      .map(async ({ value }) => {
        const { presignedUrl, blob, localSrc, imageInfo } = value;
        try {
          await uploadImageToS3(presignedUrl, blob);
          const s3Url = presignedUrl.split('?')[0];

          return {
            localSrc,
            s3Url,
            width: imageInfo.width,
            height: imageInfo.height
          };
        } catch (error) {
          console.error('이미지 업로드 실패:', error);
          return null;
        }
      });

    // 모든 이미지 업로드가 완료될 때까지 대기
    const uploadedImages = (await Promise.allSettled(imageUploadPromises))
      .filter(result => result.status === 'fulfilled' && result.value !== null)
      .map(result => result.value);

    // HTML 수정 로직 업데이트 (새 이미지만)
    uploadedImages.forEach(({ localSrc, s3Url, width, height }) => {
      images.forEach(img => {
        const imgSrc = img.getAttribute('src');

        if (imgSrc === localSrc) {
          img.setAttribute('src', s3Url);
          const styleObject = {
            width,
            height,
            maxWidth: '100%',
            display: 'block'
          };
          const styleString = Object.entries(styleObject)
            .map(([key, value]) => `${key}: ${value}`)
            .join('; ');
          img.setAttribute('style', styleString);
        }
      });
    });

    // 최종 HTML 내용 업데이트
    const finalContent = tempDiv.innerHTML;

    const tempDivForImageUrls = document.createElement('div');
    tempDivForImageUrls.innerHTML = finalContent;
    const finalImages = Array.from(tempDivForImageUrls.querySelectorAll('img[src]'));
    const imageUrls = finalImages.map(img => img.src);

    // 리뷰 업데이트 요청
    await updateReview(selectedReview.value.id, {
      title: editedReviewTitle.value,
      content: finalContent,
      imageUrls: imageUrls
    });

    // 로컬 상태 업데이트
    selectedReview.value.title = editedReviewTitle.value;
    selectedReview.value.content = finalContent;
    isEditing.value = false;

    await loadingSwal.close();

    // 성공 알림
    Swal.fire({
      title: '수정 완료',
      text: '리뷰가 성공적으로 수정되었습니다.',
      icon: 'success',
      confirmButtonText: '확인',
      confirmButtonColor: '#0077b6',
    });
  } catch (error) {
    // 오류 알림
    Swal.fire({
      title: '수정 실패',
      text: error.response.data.message,
      icon: 'error',
      confirmButtonText: '확인',
      confirmButtonColor: '#0077b6',
    });
    console.error('리뷰 수정 과정에서 오류가 발생했습니다:', error);
  }
};

const compressImage = (blob) => {
  return new Promise((resolve, reject) => {
    new Compressor(blob, {
      quality: 0.6,
      success(result) {
        resolve(result);
      },
      error(err) {
        reject(err);
      },
    });
  });
};

const cancelEdit = () => {
  isEditing.value = false;
};

const deleteReviewAction = (index) => {
  Swal.fire({
    title: '리뷰를 삭제하시겠습니까?',
    text: '삭제된 리뷰는 복구할 수 없습니다.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: '삭제',
    cancelButtonText: '취소',
    confirmButtonColor: '#b32020',
    cancelButtonColor: '#c1c1c1',
  }).then(async (result) => {
    if (result.isConfirmed) {

        const loadingSwal = Swal.fire({
          title: '삭제 중...',
          text: '리뷰를 삭제하고 있습니다. 잠시만 기다려주세요.',
          icon: 'info',
          allowOutsideClick: false,
          showConfirmButton: false,
          didOpen: () => {
            Swal.showLoading(); // 로딩 애니메이션 활성화
          },
        });
        try {
        await deleteReview(index); // 리뷰 삭제 API 호출

        await loadingSwal.close();

        Swal.fire({
          title: '삭제 완료',
          text: '리뷰가 성공적으로 삭제되었습니다.',
          icon: 'success',
          confirmButtonText: '확인',
          confirmButtonColor: '#0077b6',
        }).then(() => {
          window.scrollTo({ top: 0, behavior: 'smooth' }); // 스크롤 맨 위로 이동
        });
        selectedReview.value = null; // 삭제 후 선택된 리뷰 초기화
        await fetchReviewsForCampsite(selectedCampsite.value); // 리뷰 목록 다시 불러오기
      } catch (error) {
        Swal.fire({
          title: '삭제 실패',
          text: error.response.data.message,
          icon: 'error',
          confirmButtonText: '확인',
          confirmButtonColor: '#0077b6',
        }).then(() => {
          window.scrollTo({ top: 0, behavior: 'smooth' }); // 스크롤 맨 위로 이동
        });
        console.error('리뷰 삭제 과정에서 오류가 발생했습니다:', error);
      }
    }
  });
}

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

onMounted(async () => {
  const { campsiteId, reviewId } = router.currentRoute.value.query;


  if (campsiteId) {
    try {
      const campsiteDetail = (await getCampsiteDetail(campsiteId)).data.result;
      campings.value = [campsiteDetail]; // 검색 결과를 해당 캠핑장으로 제한
      totalItems.value = 1;
      selectedCampsite.value = campsiteDetail;

      const response = await getReviewByCampsite(campsiteId);
      reviews.value = response.data.result;

      if (reviewId) {
        selectedReview.value = reviews.value.find(
          (review) => review.id === parseInt(reviewId)
        );
        canEdit.value = userId.value === selectedReview.value.writerId;
        console.log(canEdit.value)
      }
    } catch (error) {
      console.error("캠핑장 정보를 불러오는 중 오류가 발생했습니다:", error);
    }
  } else {
    await fetchRegionOptions();
    await fetchCampings();
  }
});

</script>

<style scoped>
.view-review {
  display: flex;
  flex-direction: row;
  min-height: 100vh;
  background-color: #f9fafb;
  padding: 40px;
  position: relative;
  overflow: hidden;
  width: 70%;
  margin: 0 auto;
}

.section {
  background-color: #ffffff;
  border-radius: 8px;
  padding: 24px;
  transition: all 0.3s ease-in-out;
  border-right: 1px solid #e5e7eb;
  flex: 1;
  min-width: 0;
}

.section.search {
  flex-basis: 60%;
  margin-right: 40px;
}

.section.reviews {
  flex-basis: 40%;
  transition: all 0.3s ease-in-out;
  transform: translateX(0);
}

.section.reviews.left {
  flex-basis: 40%;
  transform: translateX(0);
  margin-right: 40px;
}

.section.reviews.expanded {
  flex-basis: 60%;
}

.section.detail {
  flex-basis: 0;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease-in-out;
  margin-left: 40px;
}

.section.search:not(.expanded) {
  flex-basis: 40%;
  margin-right: 40px;
}

.section.detail.expanded {
  flex-basis: 60%;
  opacity: 1;
  visibility: visible;
  padding: 24px;
  margin: initial;
}

.section.hidden {
  flex-basis: 0;
  padding: 0;
  margin: 0;
  opacity: 0;
  visibility: hidden;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateX(20px);
}

.header h2 {
  font-size: 1.3rem;
  font-weight: bold;
  margin-bottom: 24px;
}

.filter-container {
  width: 100%;
}

.search-container {
  display: flex; /* flex를 활성화 */
  flex-direction: row; /* 가로 정렬 */
  align-items: center; /* 세로 중앙 정렬 */
  gap: 8px; /* 검색 바와 버튼 사이 간격 */
  width: 100%;
}

.search-bar {
  flex: 1;
  min-width: auto !important;
  width: 70% !important;
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
  display: flex;
  justify-content: space-between;
  padding: 8px 12px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.list-item:hover {
  background-color: #f3f4f6;
  transform: translateY(-2px);
}

.list-item-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.list-item-content h3 {
  font-size: 0.9rem;
  font-weight: 500;
  margin-bottom: 8px;
}

.list-item-content p {
  color: #666;
  font-size: 0.7rem;
}

.list-item-content > div {
  flex-grow: 1;
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

.campsite-content-row {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.back-button:hover {
  color: #111827;
}

.placeholder {
  height: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  color: #666;
  font-size: 0.9rem;
}

.review-list {
  padding: 24px;
}

.review-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 16px;
  border-bottom: 1px solid #e5e7eb;
}

.review-header h2 {
  font-size: 1.3rem;
  padding: 10px;
  font-weight: 600;
}

.review-count {
  color: #6b7280;
  font-size: 0.9rem;
  padding: 10px;
}

.reviews-container {
  display: flex;
  flex-direction: column;
  margin-top: 16px;
  gap: 16px;
  overflow-y: auto;
  max-height: calc(100vh - 150px);
  position: relative;
}

.review-card {
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 16px;
  transition: all 0.2s ease;
}

.review-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.review-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.review-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #111827;
}

.review-date {
  font-size: 0.8rem;
  color: #6b7280;
}

.review-preview {
  font-size: 0.9rem;
  color: #374151;
  line-height: 1.5;
  margin-bottom: 12px;
}

.review-detail {
  padding: 24px;
}

.review-detail h2 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 12px;
  padding-bottom: 16px;
  border-bottom: 1px solid #e5e7eb;
}

.review-content {
  font-size: 1rem;
  line-height: 1.7;
  color: #374151;
  background-color: #f9fafb;
  padding: 24px;
  border-radius: 8px;
  white-space: pre-wrap;
}

.review-detail p {
  color: #6b7280;
  font-size: 0.9rem;
  margin-bottom: 24px;
}

/* 아이콘 스타일 */
.fas {
  margin-right: 6px;
}

.info-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
}

.info-button img {
  width: 20px;
  height: 20px;
  transition: transform 0.2s ease;
}

.info-button:hover img {
  transform: scale(1.1);
}

.no-results {
  text-align: center;
  font-size: 1rem;
  color: #777;
  margin-top: 100px;
}

.placeholder {
  height: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  color: #666;
  font-size: 1rem;
  text-align: center;
  padding: 40px;
  background-color: #f9fafb;
  border-radius: 8px;
  border: 2px dashed #e5e7eb;
}

.view-review > .section:last-child {
  padding: 0;
  margin: 0;
}

.review-actions {
  margin-top: 20px; /* 버튼과 내용 간격 */
  display: flex;
  justify-content: flex-end; /* 오른쪽 정렬 */
  gap: 10px; /* 버튼 간 간격 */
}

.edit-button {
  background-color: #f0f0f0;
  color: black;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  white-space: nowrap;
  cursor: pointer;
  transition: background-color 0.5s;
  margin-right: 0.5rem;
}

.edit-button:hover {
  background-color: #c1c1c1;
  color: black;
}

.delete-button {
  background-color: #b32020;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  white-space: nowrap;
  cursor: pointer;
  transition: background-color 0.5s;
  margin-right: 0.5rem;
}

.delete-button:hover {
  background-color: #bb7777;
  color: white;
}

.submit-button:disabled {
  background-color: #81c3d7;
  cursor: not-allowed;
}

.cancel-button {
  background-color: #f0f0f0;
  color: black;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  white-space: nowrap;
  cursor: pointer;
  transition: background-color 0.5s;
  margin-right: 0.5rem;
}

.cancel-button:hover {
  background-color: #c1c1c1;
  color: black;
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
</style>
