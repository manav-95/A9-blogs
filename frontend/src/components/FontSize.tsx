import { Mark, mergeAttributes } from "@tiptap/core";

export interface FontSizeOptions {
  /**
   * Default font size for text.
   * @default null
   */
  defaultSize: string | null;

  /**
   * HTML attributes to add to the font-size element.
   * @default {}
   */
  HTMLAttributes: Record<string, any>;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    fontSize: {
      /**
       * Set a specific font size.
       * @example editor.commands.setFontSize('16px')
       */
      setFontSize: (size: string) => ReturnType;

      /**
       * Unset font size.
       * @example editor.commands.unsetFontSize()
       */
      unsetFontSize: () => ReturnType;
    };
  }
}

 const FontSize = Mark.create<FontSizeOptions>({
  name: "fontSize",

  addOptions() {
    return {
      defaultSize: null,
      HTMLAttributes: {},
    };
  },

  addAttributes() {
    return {
      fontSize: {
        default: this.options.defaultSize,
        parseHTML: (element) => element.style.fontSize || null,
        renderHTML: (attributes) => {
          if (!attributes.fontSize) return {};
          return { style: `font-size: ${attributes.fontSize}` };
        },
      },
    };
  },

  addCommands() {
    return {
      setFontSize:
        (size) =>
        ({ commands }) => {
          return commands.setMark(this.name, { fontSize: size });
        },

      unsetFontSize: () => ({ commands }) => {
        return commands.unsetMark(this.name);
      },
    };
  },

  parseHTML() {
    return [
      {
        style: "font-size",
        consuming: false,
        getAttrs: (style) => (style ? { fontSize: style } : false),
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ["span", mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
  },
});

export default FontSize;