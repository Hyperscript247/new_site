import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
import TextAlign from '@tiptap/extension-text-align'
import TextStyle from '@tiptap/extension-text-style'
import Color from '@tiptap/extension-color'
import Highlight from '@tiptap/extension-highlight'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import { common, createLowlight } from 'lowlight'

// Create lowlight instance with common languages
const lowlight = createLowlight(common)

/**
 * Configure TipTap editor extensions
 */
export const extensions = [
  StarterKit.configure({
    heading: {
      levels: [2, 3, 4],
    },
    codeBlock: false, // Disabled in favor of CodeBlockLowlight
  }),
  Image.configure({
    inline: true,
    allowBase64: true,
    HTMLAttributes: {
      class: 'rounded-lg max-w-full h-auto',
    },
  }),
  Link.configure({
    openOnClick: false,
    HTMLAttributes: {
      class: 'text-blue-600 underline hover:text-blue-800',
      target: '_blank',
      rel: 'noopener noreferrer',
    },
  }),
  Placeholder.configure({
    placeholder: 'Start writing your blog post...',
  }),
  TextAlign.configure({
    types: ['heading', 'paragraph'],
  }),
  TextStyle,
  Color,
  Highlight.configure({
    multicolor: true,
  }),
  CodeBlockLowlight.configure({
    lowlight,
    HTMLAttributes: {
      class: 'bg-gray-900 text-gray-100 rounded-lg p-4 font-mono text-sm',
    },
  }),
]
