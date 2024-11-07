<template>
    <div class="home">

        <ImageSlider class="imageSlider"
            :images="['/images/main(1).png', '/images/main(2).png', '/images/main(3).png']"
            :interval="5000"
        />

        <ButtonDark class="view-all-campsites" label="View All Campsites" @click="viewAll" />
        <div>
            <CampsiteCardGrid />
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router' // 이미 내장된 Vue Router 사용
import CampsiteCardGrid from '@/components/layout/CampsiteCardGrid.vue';
import ButtonDark from '@/components/component/ButtonDark.vue';
import ImageSlider from '@/components/layout/ImageSlider.vue';

export default defineComponent({
    name: 'HomePage',
    components: {
        CampsiteCardGrid,
        ButtonDark,
        ImageSlider
    },
    setup() {
        const router = useRouter(); // router 인스턴스 가져오기

        const viewAll = () => {
            router.push('/viewCampsites');
        };

        return { viewAll };
    }
})
</script>

<style scoped>
.home {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.view-all-campsites {
    margin: 25px;
}

.imageSlider {
    margin: 25px
}
</style>
