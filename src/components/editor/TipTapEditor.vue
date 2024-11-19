<template>
  <div>
    <div class="editor-toolbar">
      <div class="toolbar-group">
        <button
          @click="editor.chain().focus().toggleBold().run()"
          :class="{ 'is-active': editor && editor.isActive('bold') }"
          class="toolbar-button"
        >
          <span class="material-icons">format_bold</span>
        </button>
        <button
          @click="editor.chain().focus().toggleItalic().run()"
          :class="{ 'is-active': editor && editor.isActive('italic') }"
          class="toolbar-button"
        >
          <span class="material-icons">format_italic</span>
        </button>
        <button
          @click="editor.chain().focus().toggleUnderline().run()"
          :class="{ 'is-active': editor && editor.isActive('underline') }"
          class="toolbar-button"
        >
          <span class="material-icons">format_underlined</span>
        </button>
      </div>

      <div class="toolbar-group">
        <button
          @click="editor.chain().focus().toggleHighlight().run()"
          :class="{ 'is-active': editor && editor.isActive('highlight') }"
          class="toolbar-button"
        >
          <span class="material-icons">highlight</span>
        </button>
      </div>

      <div class="toolbar-group">
        <button
          @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
          :class="{ 'is-active': editor && editor.isActive('heading', { level: 1 }) }"
          class="toolbar-button"
        >
          <span class="material-icons">looks_one</span>
        </button>
        <button
          @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
          :class="{ 'is-active': editor && editor.isActive('heading', { level: 2 }) }"
          class="toolbar-button"
        >
          <span class="material-icons">looks_two</span>
        </button>
      </div>

      <div class="toolbar-group">
        <button
          @click="editor.chain().focus().setTextAlign('left').run()"
          :class="{ 'is-active': editor && editor.isActive({ textAlign: 'left' }) }"
          class="toolbar-button"
        >
          <span class="material-icons">format_align_left</span>
        </button>
        <button
          @click="editor.chain().focus().setTextAlign('center').run()"
          :class="{ 'is-active': editor && editor.isActive({ textAlign: 'center' }) }"
          class="toolbar-button"
        >
          <span class="material-icons">format_align_center</span>
        </button>
        <button
          @click="editor.chain().focus().setTextAlign('right').run()"
          :class="{ 'is-active': editor && editor.isActive({ textAlign: 'right' }) }"
          class="toolbar-button"
        >
          <span class="material-icons">format_align_right</span>
        </button>
      </div>

      <div class="toolbar-group">
        <button
          @click="editor.chain().focus().toggleBulletList().run()"
          :class="{ 'is-active': editor && editor.isActive('bulletList') }"
          class="toolbar-button"
        >
          <span class="material-icons">format_list_bulleted</span>
        </button>
        <button
          @click="editor.chain().focus().toggleOrderedList().run()"
          :class="{ 'is-active': editor && editor.isActive('orderedList') }"
          class="toolbar-button"
        >
          <span class="material-icons">format_list_numbered</span>
        </button>
      </div>

      <div class="toolbar-group">
        <button
          @click="editor.chain().focus().toggleBlockquote().run()"
          :class="{ 'is-active': editor && editor.isActive('blockquote') }"
          class="toolbar-button"
        >
          <span class="material-icons">format_quote</span>
        </button>
        <button
          @click="editor.chain().focus().toggleCodeBlock().run()"
          :class="{ 'is-active': editor && editor.isActive('codeBlock') }"
          class="toolbar-button"
        >
          <span class="material-icons">code</span>
        </button>
      </div>

    </div>
    <editor-content
      class="editor-content"
      v-if="editor"
      :editor="editor"
      @drop.prevent="handleDrop"
      @dragover.prevent
      @update="onUpdate"
    />
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref, watch } from 'vue';
import { Editor, EditorContent } from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';
import Bold from '@tiptap/extension-bold';
import Italic from '@tiptap/extension-italic';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Highlight from '@tiptap/extension-highlight';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import ListItem from '@tiptap/extension-list-item';
import CodeBlock from '@tiptap/extension-code-block';
import Blockquote from '@tiptap/extension-blockquote';
import Image from '@tiptap/extension-image';
import ResizableImage from './ResizableImage';

const props = defineProps({
  modelValue: String, // v-model을 위해 필요한 prop
});

const emit = defineEmits(['update:modelValue']);

const editor = ref(null);

onMounted(() => {
  editor.value = new Editor({
    extensions: [
      StarterKit,
      Bold,
      Italic,
      Underline,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Image,
      Highlight,
      BulletList,
      OrderedList,
      ListItem,
      CodeBlock,
      Blockquote,
      ResizableImage
    ],
    content: '',
    onUpdate: ({ editor }) => {
      // 에디터 내용이 변경될 때 부모 컴포넌트로 이벤트 전달
      emit('update:modelValue', editor.getHTML());
    },
  });
});

const handleDrop = (event) => {
  const files = event.dataTransfer.files;
  if (files.length === 0) return;

  const file = files[0];
  if (!file.type.startsWith('image/')) return;

  const previewUrl = URL.createObjectURL(file);
  editor.value.chain().focus().insertContent({
    type: 'resizableImage',
    attrs: {
      src: previewUrl,
      width: '100%',
      height: 'auto'
    }
  }).run();
};

const onUpdate = () => {
  if (editor.value) {
    emit('update:modelValue', editor.value.getHTML());
  }
};

watch(
  () => props.modelValue,
  (newValue) => {
    if (editor.value && editor.value.getHTML() !== newValue) {
      editor.value.commands.setContent(newValue || '');
    }
  }
);

onBeforeUnmount(() => {
  editor.value?.destroy();
});
</script>

<style scoped>
.editor-toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-bottom: none;
  border-radius: 5px 5px 0 0;
  background-color: #f8f8f8;
}

.toolbar-group {
  display: flex;
  gap: 0.25rem;
  border-right: 1px solid #ddd;
  padding-right: 0.5rem;
}

.toolbar-group:last-child {
  border-right: none;
}

.toolbar-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border: 1px solid transparent;
  border-radius: 4px;
  background: none;
  cursor: pointer;
  transition: all 0.2s;
}

.toolbar-button:hover {
  background-color: #e9ecef;
}

.toolbar-button.is-active {
  background-color: #e9ecef;
  border-color: #ced4da;
}

.material-icons {
  font-size: 1.25rem;
  color: #495057;
}

.editor-content {
  min-height: 300px;
  height: auto;
  padding: 1rem;
  border-radius: 5px;
  border: 1px solid #ddd;
  outline: none !important;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.1);
}

:deep(.ProseMirror) {
  outline: none;
}

:deep(.ProseMirror p.is-editor-empty:first-child::before) {
  color: #adb5bd;
  content: attr(data-placeholder);
  float: left;
  height: 0;
  pointer-events: none;
}

:deep(.ProseMirror:focus) {
  outline: none;
}

:deep(.ProseMirror p) {
  margin: 0;
}

:deep(.ProseMirror p:focus) {
  outline: none !important;
  border: none !important;
  box-shadow: none !important;
}

:deep(.ProseMirror *) {
  outline: none !important;
  border: none !important;
  box-shadow: none !important;
}
</style>
