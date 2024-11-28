import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import UserAvatar from '@/components/UserAvatar';
import { Button } from '@/components/ui/button';
import './style.css';
import { usePostCommentMutation } from '@/modules/pin/components/Comment/CommentInput/mutations';
import { Navigate, useParams } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useAppSelector } from '@/redux/hooks';
import { selectAuth } from '@/redux/slices/authSlice';

export default function CommentEditor() {
  const { user } = useAppSelector(selectAuth);
  const { pinId } = useParams();
  const { toast } = useToast();
  if (!pinId) return <Navigate to="/" replace />; // Add error handling for invalid pinId

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bold: false,
        italic: false,
      }),
      Placeholder.configure({
        placeholder: 'Write your comment...',
      }),
    ],
  });

  const { mutate } = usePostCommentMutation({ pinId: +pinId });

  const input =
    editor?.getText({
      blockSeparator: '\n',
    }) || '';

  const handlePostComment = () => {
    mutate(
      {
        content: input,
      },
      {
        onSuccess: (data) => {
          // Clear the editor and reset input field after successful comment post
          editor?.commands.clearContent();
          toast({
            title: data.message,
            description: 'Your comment has been posted.',
            duration: 3000,
          });
        },
      }
    );
  };

  return (
    <div className="">
      <div className="flex gap-5">
        <UserAvatar
          username={user?.username || ''}
          userAvatarUrl={user?.avatar || ''}
          className="hidden sm:inline"
        />
        <EditorContent
          editor={editor}
          className="w-full max-h-[20rem] overflow-y-auto bg-white border-1 border-black/40 rounded-md px-5 py-2 text-black"
        />
        <Button onClick={handlePostComment} className="h-auto">
          Gửi
        </Button>
      </div>
    </div>
  );
}
