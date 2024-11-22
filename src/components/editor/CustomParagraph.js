// CustomParagraph.js
import { Paragraph } from '@tiptap/extension-paragraph';

const CustomParagraph = Paragraph.extend({
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

export default CustomParagraph;
