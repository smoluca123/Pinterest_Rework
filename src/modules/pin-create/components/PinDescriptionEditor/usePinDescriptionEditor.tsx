import Placeholder from '@tiptap/extension-placeholder';
import { Editor, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useCallback } from 'react';

interface IProps {
  onChange: (value: string) => void;
  value?: string;
}

export default function usePinDescriptionEditor({ onChange, value }: IProps) {
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
        placeholder: 'Write your description...',
      }),
    ],
    content: value,
    onUpdate: useCallback(
      ({ editor }: { editor: Editor }) => {
        onChange(editor.isEmpty ? '' : editor.getHTML());
      },
      [onChange]
    ),
  });

  return editor;
}
