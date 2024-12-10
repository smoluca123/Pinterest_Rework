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
import { useToast } from "@/hooks/use-toast";
import { UserDataType } from "@/lib/types";
import { ProfileUpdateValues } from "@/lib/validations";
import { useUpdateProfileMutaion } from "@/modules/profile/components/UpdateProfile/mutations";
import UpdateProfileForm from "@/modules/profile/components/UpdateProfile/UpdateProfileForm";
import { useRef } from "react";
import { UseFormReturn } from "react-hook-form";

interface IProps {
  userData: UserDataType;
  open: boolean;
  onClose: () => void; // Function to close the dialog when the user clicks the "Cancel" button or presses the escape key.
}

export default function UpdateProfileDialog({
  userData,
  open,
  onClose,
}: IProps) {
  const { toast } = useToast();
  const { mutate, isPending } = useUpdateProfileMutaion();

  const handleUpdateProfile = ({
    values,
    form,
  }: {
    values: ProfileUpdateValues;
    form: UseFormReturn<ProfileUpdateValues, any, undefined>;
  }) => {
    mutate(values, {
      onSuccess: () => {
        // Reset form values after successful profile update
        form.reset();
        onClose();

        toast({
          title: "Thành công",
          description: "Cập nhật thông tin thành công",
          duration: 3000,
        });
      },
    });
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };
  const submitRef = useRef<HTMLButtonElement>(null);
  return (
    <Dialog onOpenChange={handleOpenChange} open={open}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Chỉnh sửa hồ sơ</DialogTitle>
          <DialogDescription>Cập nhật thông tin người dùng.</DialogDescription>
        </DialogHeader>
        <UpdateProfileForm
          userData={userData}
          onSubmit={handleUpdateProfile}
          ref={submitRef}
        />
        <DialogFooter>
          <Button onClick={onClose}>Hủy bỏ</Button>
          <LoadingButton
            isLoading={isPending}
            variant="normal"
            onClick={() => submitRef.current?.click()}
          >
            Cập nhật
          </LoadingButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
