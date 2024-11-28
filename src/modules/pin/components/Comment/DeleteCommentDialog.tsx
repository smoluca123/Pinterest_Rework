import LoadingButton from '@/components/LoadingButton';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { CommentDataType } from '@/lib/types';
import { useDeleteCommentMutation } from '@/modules/pin/components/Comment/mutations';

interface IProps {
  open: boolean;
  commentData: CommentDataType;
  onClose: () => void;
}

export default function DeleteCommentDialog({
  open,
  onClose,
  commentData,
}: IProps) {
  const { toast } = useToast();

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  const { mutate, isPending } = useDeleteCommentMutation({
    comment: commentData,
  });
  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Xóa bình luận?</DialogTitle>
          <DialogDescription>
            Bạn có chắc chắn muốn xóa bình luận này?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <LoadingButton
            isLoading={isPending}
            disabled={isPending}
            onClick={() =>
              mutate(undefined, {
                onSuccess: () => {
                  onClose();
                  toast({
                    title: 'Xóa thành công',
                    description: 'Bình luận đã được xóa',
                    duration: 3000,
                  });
                },
              })
            }
          >
            Xóa
          </LoadingButton>
          <Button variant="outline" onClick={onClose}>
            Hủy
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
