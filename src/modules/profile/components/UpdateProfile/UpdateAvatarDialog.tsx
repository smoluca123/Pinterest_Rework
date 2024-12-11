import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { UserDataType } from "@/lib/types";
import { useUpdateAvatarMutation } from "@/modules/profile/components/UpdateProfile/mutations";
import UpdateAvatarForm from "@/modules/profile/components/UpdateProfile/UpdateAvatarForm";
import { useEffect, useRef } from "react";

interface IProps {
  userData: UserDataType;
  open: boolean;
  onClose: () => void; // Function to close the dialog when the user clicks the "Cancel" button or presses the escape key.
}

export default function UpdateAvatarDialog({
  onClose,
  open,
  userData,
}: IProps) {
  const submitRef = useRef<HTMLButtonElement>(null);

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      onClose();
    }
  };

  const { mutate, isPending, isSuccess } = useUpdateAvatarMutation();

  useEffect(() => {
    if (isSuccess) {
      onClose();
    }
  }, [isSuccess]);

  return (
    <div>
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cập nhật avatar</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            Chỉnh sửa ảnh đại diện,{" "}
            <span className="italic font-semibold">
              kéo thả ảnh vào để cập nhật ảnh đại diện
            </span>
          </DialogDescription>

          <UpdateAvatarForm
            userData={userData}
            onSubmit={mutate}
            ref={submitRef}
          />

          <DialogFooter>
            <Button onClick={onClose}>Hủy</Button>
            <LoadingButton
              isLoading={isPending}
              variant="normal"
              onClick={() => submitRef.current?.click()}
            >
              Xác nhận
            </LoadingButton>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
