// src/components/editor/ResizableImage.js
import { Node } from '@tiptap/core'
import { VueNodeViewRenderer } from '@tiptap/vue-3'
import ResizableImageComponent from './ResizableImageComponent.vue'

export default Node.create({
  name: 'resizableImage',

  group: 'block',

  atom: true,

  addAttributes() {
    return {
      src: {
        default: null,
      },
      alt: {
        default: null,
      },
      style: {
        default: null,
        parseHTML: element => element.getAttribute('style') || '',
        renderHTML: attributes => {
          const { width = '100%', height = 'auto' } = attributes;
          return {
            style: `width: ${width}; height: ${height};`,
          };
        },
      },
      width: {
        default: '100%',
      },
      height: {
        default: 'auto',
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'img[src]',
        getAttrs: element => {
          const styleString = element.getAttribute('style') || '';
          const styleObject = parseStyleString(styleString);
          return {
            src: element.getAttribute('src'),
            alt: element.getAttribute('alt'),
            width: styleObject.width || '100%',
            height: styleObject.height || 'auto',
          };
        },
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    const { width, height, ...rest } = HTMLAttributes;
    const style = `width: ${width}; height: ${height};`;
    return ['img', { ...rest, style }];
  },

  addNodeView() {
    return VueNodeViewRenderer(ResizableImageComponent)
  },
})

function parseStyleString(styleString) {
  const styles = {};
  styleString.split(';').forEach(styleRule => {
    if (styleRule) {
      const [key, value] = styleRule.split(':').map(s => s.trim());
      styles[key] = value;
    }
  });
  return styles;
}
