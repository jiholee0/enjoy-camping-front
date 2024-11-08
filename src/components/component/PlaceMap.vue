<template>
  <div ref="placeMap" class="place-map"></div>
</template>

<script>
import { onMounted, ref } from 'vue';

export default {
  name: 'PlaceMap',
  props: {
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const placeMap = ref(null);

    const loadKakaoMapsScript = () => {
      return new Promise((resolve, reject) => {
        if (window.kakao && window.kakao.maps) {
          resolve();
        } else {
          const kakaoMapKey = import.meta.env.VITE_KAKAO_MAPS_API_KEY;
          const script = document.createElement('script');
          script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoMapKey}&autoload=false`;
          script.onload = () => window.kakao.maps.load(resolve);
          script.onerror = reject;
          document.head.appendChild(script);
        }
      });
    };

    const initializeMap = () => {
      const options = {
        center: new window.kakao.maps.LatLng(props.latitude, props.longitude),
        level: 3,
      };

      const map = new window.kakao.maps.Map(placeMap.value, options);

      new window.kakao.maps.Marker({
        map,
        position: new window.kakao.maps.LatLng(props.latitude, props.longitude),
      });
    };

    onMounted(async () => {
      try {
        await loadKakaoMapsScript();
        initializeMap();
      } catch (error) {
        console.error('Failed to load Kakao Maps:', error);
      }
    });

    return {
      placeMap,
    };
  },
};
</script>

<style scoped>

.place-map {
  width: 100%;
  height: 300px;
  max-width: 1000px;
  border-radius: 12px; /* 둥근 모서리 */
  overflow: hidden; /* 둥근 모서리 밖의 내용 잘라내기 */
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.2); /* 그림자 효과 */
  border: 2px solid #eeeeee; /* 연한 테두리 */
  position: relative;
}

/* Loading animation or overlay for better user experience */
.place-map::before {
  content: 'Loading Map...';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #888888;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  z-index: 1;
  display: none; /* 지도 로드 중일 때만 보이게 */
}

</style>
