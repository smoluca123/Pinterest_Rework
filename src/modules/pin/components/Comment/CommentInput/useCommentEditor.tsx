import Placeholder from '@tiptap/extension-placeholder';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

export default function useCommentEditor() {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bold: {
          HTMLAttributes: { class: 'font-bold' },
        },
        italic: {
          HTMLAttributes: { class: 'font-italic' },
        },
      }),
      Placeholder.configure({
        placeholder: 'Write your comment...',
      }),
    ],
  });

  const input = editor?.getHTML() || '';

  return { editor, input };
}
