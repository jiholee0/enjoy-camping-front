<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="withdraw">
    <h2>탈퇴 안내</h2>
    <ul>
      <li>
        회원 탈퇴를 진행하면,
        <b>모든 개인 정보와 작성한 리뷰, 찜한 항목 등 서비스 이용 기록이 영구적으로 삭제</b>
        되며, 복구가 불가능합니다.
      </li>
      <li>
        탈퇴 후 동일한 이메일로 재가입이 가능합니다. 단, 삭제된 정보는 복구되지 않습니다.
      </li>
    </ul>
    <h2>확인 사항</h2>
    <ul>
      <li>탈퇴하기 전, 꼭 필요한 데이터는 저장하시기 바랍니다.</li>
      <li>탈퇴 절차는 아래 버튼을 클릭하여 계속 진행할 수 있습니다.</li>
    </ul>
  </div>
  <ButtonDark class="withdrawal-confirm-button" label="&nbsp;탈퇴하기 😭" @click.stop="handleWithdrawl" />
</template>

<script setup>
import ButtonDark from "@/components/button/ButtonDark.vue";
import Swal from "sweetalert2";
import { withdrawal } from "@/api/userApi";
import { useRouter } from "vue-router";

const router = useRouter();
const handleWithdrawl = () => {

    Swal.fire({
    title: '탈퇴하시겠습니까?',
    text: '탈퇴한 후 개인정보는 복구할 수 없습니다.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: '탈퇴',
    cancelButtonText: '취소',
    confirmButtonColor: '#b32020',
    cancelButtonColor: '#c1c1c1',
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        const loadingSwal = Swal.fire({
          title: '탈퇴 중...',
          text: '탈퇴하고 있습니다. 잠시만 기다려주세요.',
          icon: 'info',
          allowOutsideClick: false,
          showConfirmButton: false,
          didOpen: () => {
            Swal.showLoading(); // 로딩 애니메이션 활성화
          },
        });

        await withdrawal();

        await loadingSwal.close();

        Swal.fire({
          title: '탈퇴 완료',
          text: '탈퇴가 성공적으로 완료되었습니다.',
          icon: 'success',
          confirmButtonText: '확인',
          confirmButtonColor: '#0077b6',
        }).then(() => {
          router.push('/');
          window.scrollTo({ top: 0, behavior: 'smooth' }); // 스크롤 맨 위로 이동
        });

      } catch (error) {
        Swal.fire({
          title: '탈퇴 실패',
          text: '탈퇴 중 문제가 발생했습니다. 다시 시도해주세요.',
          icon: 'error',
          confirmButtonText: '확인',
          confirmButtonColor: '#0077b6',
        }).then(() => {
          window.scrollTo({ top: 0, behavior: 'smooth' }); // 스크롤 맨 위로 이동
        });
        console.error('탈퇴 과정에서 오류가 발생했습니다:', error);
      }
    }
  });

}
</script>

<style scoped>
.withdraw {
  padding: 20px;
  margin: 0 auto 20px;
  text-align: left;
  width: 100%;
  border: 1px solid #c9c9c9;
  border-radius: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.withdraw h2 {
  font-size: 1rem;
  margin-bottom: 10px;
}

.withdraw p {
  font-size: 0.8rem;
  margin-bottom: 10px;
  line-height: 1.6;
}

.withdraw ul {
  font-size: 0.8rem;
  margin: 10px 0;
  padding-left: 20px;
}

.withdraw ul li {
  margin-bottom: 5px;
}

.withdrawal-confirm-button {
  background-color: #ff4d4d;
  color: #fff;
}

.withdrawal-confirm-button:hover {
  background-color: #e63946;
}
</style>
