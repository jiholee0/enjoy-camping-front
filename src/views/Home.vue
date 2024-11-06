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
import CampsiteCardGrid from '@/components/layout/CampsiteCardGrid.vue';
import ButtonDark from '@/components/component/ButtonDark.vue';
import ImageSlider from '@/components/layout/ImageSlider.vue';


export default defineComponent({
    name: 'Home',
    components: {
        CampsiteCardGrid,
        ButtonDark,
        ImageSlider
    },
    method: {
        viewAll(){

        }
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
