<template>
  <node-view-wrapper class="resizable-image-wrapper" :class="{ resizing }">
    <node-view-content as="span" style="display: none" />
    <div
      class="image-container"
      :class="{
        'is-selected': selected,
        'border-highlight': imageClicked,
        'with-shadow': resizing
      }"
      @click="toggleImageBorder"
    >
      <img
        :src="node.attrs.src"
        :style="{
          width: width,
          height: height,
          maxWidth: '500px'
        }"
        @click.stop
        ref="imageRef"
      />
      <div v-if="selected" class="resize-controls">
        <!-- 양방향 화살표 리사이즈 핸들 -->
        <div class="resize-handle bottom-right" @mousedown.stop="startResize">
          <svg width="16" height="16" viewBox="0 0 16 16" stroke-width="1.5">
            <path
              d="M3,8 L13,8"
              stroke="#0077b6"
              stroke-linecap="round"
              transform="rotate(45 8 8)"
            />
            <!-- 왼쪽 화살표 -->
            <path
              d="M5.5,5.5 L3,8 L5.5,10.5"
              stroke="#0077b6"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
              transform="rotate(45 8 8)"
            />
            <!-- 오른쪽 화살표 -->
            <path
              d="M10.5,5.5 L13,8 L10.5,10.5"
              stroke="#0077b6"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
              transform="rotate(45 8 8)"
            />
          </svg>
        </div>

        <!-- 크기 표시 라벨 -->
        <div class="size-label" v-if="resizing">
          {{ Math.round(parseInt(width)) }} x {{ Math.round(parseInt(height)) }}
        </div>
      </div>
    </div>
  </node-view-wrapper>
</template>

<script setup>
import { ref } from 'vue'
import { NodeViewWrapper, NodeViewContent } from '@tiptap/vue-3'

const props = defineProps({
  node: {
    type: Object,
    required: true
  },
  updateAttributes: {
    type: Function,
    required: true
  },
  selected: {
    type: Boolean,
    default: false
  }
})

const imageRef = ref(null)
const resizing = ref(false)
const width = ref(props.node.attrs.width || '100%')
const height = ref(props.node.attrs.height || 'auto')
const imageClicked = ref(false)

const startResize = (event) => {
  event.preventDefault()
  resizing.value = true

  const startX = event.pageX
  const startWidth = imageRef.value.offsetWidth
  const startHeight = imageRef.value.offsetHeight

  const handleMouseMove = (event) => {
    const newWidth = startWidth + (event.pageX - startX)
    const aspectRatio = startHeight / startWidth
    const newHeight = newWidth * aspectRatio

    width.value = `${newWidth}px`
    height.value = `${newHeight}px`

    props.updateAttributes({
      width: width.value,
      height: height.value
    })
  }

  const handleMouseUp = () => {
    resizing.value = false
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseup', handleMouseUp)
  }

  document.addEventListener('mousemove', handleMouseMove)
  document.addEventListener('mouseup', handleMouseUp)
}

const toggleImageBorder = () => {
  imageClicked.value = !imageClicked.value
}
</script>

<style scoped>
.resizable-image-wrapper {
  position: relative;
  display: inline-block;
  max-width: 100%;
  margin: 8px 0;
}

.image-container {
  position: relative;
  display: inline-block;
  max-width: 500px;
  border: 2px solid transparent;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.image-container.is-selected {
  border-color: #0077b6 !important;
}

.image-container.border-highlight {
  border-color: #ff9800 !important;
}

.image-container.with-shadow {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.image-container img {
  display: block;
  max-width: 100%;
  border-radius: 2px;
}

.resize-controls {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.resize-handle {
  position: absolute;
  width: 20px;
  height: 20px;
  pointer-events: all;
  cursor: se-resize;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s ease;
  background-color: white;
  border: 1px solid #e9ecef;
  border-radius: 4px;
  right: -10px;
  bottom: -10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.resize-handle:hover {
  transform: scale(1.1);
  background-color: #f8f9fa;
}

.resize-handle:active {
  transform: scale(0.95);
}

.size-label {
  position: absolute;
  top: -30px;
  right: 0;
  background-color: #0077b6;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  pointer-events: none;
  white-space: nowrap;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.resizing {
  user-select: none;
}

.resizing .image-container {
  border-color: #0077b6;
}

.resizing img {
  pointer-events: none;
}
</style>
