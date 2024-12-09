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
import { PinDataType } from '@/lib/types';
import { useRemovePinMutation } from '@/modules/pin/components/PinDetail/mutations';

interface IProps {
  open: boolean;
  pinData: PinDataType;
  onClose: () => void;
}

export default function RemovePinDialog({ open, onClose, pinData }: IProps) {
  const { toast } = useToast();

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  const { mutate, isPending } = useRemovePinMutation({ pinData });
  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Xóa bài viết?</DialogTitle>
          <DialogDescription>
            Bạn có chắc chắn muốn xóa bài viết này?
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
                    description: 'Bài viết đã được xóa',
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
