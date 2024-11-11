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
  <ButtonDark class="withdrawal-confirm-button" label="&nbsp;탈퇴하기 😭" />
</template>

<script setup>
import ButtonDark from "@/components/ButtonDark.vue";
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
