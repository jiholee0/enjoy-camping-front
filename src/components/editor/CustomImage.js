// CustomImage.js
import { Image } from '@tiptap/extension-image';

const CustomImage = Image.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      style: {
        default: null,
        parseHTML: element => element.getAttribute('style'),
        renderHTML: attributes => {
          return {
            style: attributes.style || null,
          };
        },
      },
    };
  },
});

export default CustomImage;
