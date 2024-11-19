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
        default: null
      },
      alt: {
        default: null
      },
      width: {
        default: '100%',
        parseHTML: element => element.style.width,
        renderHTML: attributes => ({
          style: `width: ${attributes.width}`
        })
      },
      height: {
        default: 'auto',
        parseHTML: element => element.style.height,
        renderHTML: attributes => ({
          style: `height: ${attributes.height}`
        })
      }
    }
  },

  parseHTML() {
    return [
      {
        tag: 'img[src]',
        getAttrs: el => ({
          src: el.getAttribute('src'),
          width: el.style.width,
          height: el.style.height
        })
      }
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['img', HTMLAttributes]
  },

  addNodeView() {
    return VueNodeViewRenderer(ResizableImageComponent)
  }
})
