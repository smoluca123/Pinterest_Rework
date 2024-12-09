import LoadingButton from '@/components/LoadingButton';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { CommentDataType } from '@/lib/types';
import useCommentEditor from '@/modules/pin/components/Comment/CommentInput/useCommentEditor';
import { useEditCommentMutation } from '@/modules/pin/components/Comment/mutations';
import { EditorContent } from '@tiptap/react';
import { useEffect } from 'react';

interface IProps {
  open: boolean;
  onClose: () => void;
  commentData: CommentDataType; // Define CommentDataType interface here
}

export default function EditCommentDialog({
  commentData,
  onClose,
  open,
}: IProps) {
  const { editor, input } = useCommentEditor();

  const { mutate, isPending } = useEditCommentMutation({
    comment: commentData,
  });

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      onClose();
    }

    // Add your edit comment logic here
  };

  useEffect(() => {
    editor?.commands.setContent(commentData.content);
  }, [commentData]);

  useEffect(() => {
    if (open) {
      editor?.commands.setContent(commentData.content);
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Chỉnh sửa bình luận</DialogTitle>
        </DialogHeader>

        <EditorContent
          editor={editor}
          className="w-full max-h-[20rem] overflow-y-auto bg-white border-1 border-black/40 rounded-md px-5 py-2 text-black"
        />

        <DialogFooter>
          <LoadingButton
            isLoading={isPending}
            onClick={() =>
              mutate(
                {
                  newCommentContent: input,
                },
                {
                  onSuccess: () => {
                    onClose();
                    // Add your success callback here
                  },
                }
              )
            }
          >
            Sửa
          </LoadingButton>
          <Button variant="outline" onClick={onClose}>
            Hủy
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
