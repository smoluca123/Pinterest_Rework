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
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { PinDataType } from "@/lib/types";
import { PinUpdateValues } from "@/lib/validations";
import PinDescriptionEditor from "@/modules/pin-create/components/PinDescriptionEditor/PinDescriptionEditor";
import { useUpdatePinMutation } from "@/modules/pin/components/PinDetail/PinUpdate/mutations";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import slugify from "slugify";

export default function UpdatePinDialog({
  open,
  onClose,
  pinData,
}: {
  open: boolean;
  onClose: () => void;
  pinData: PinDataType;
}) {
  const { toast } = useToast();

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  const form = useForm<PinUpdateValues>({
    defaultValues: {
      description: pinData.description,
      name: pinData.name,
      slug: pinData.slug,
    },
  });

  const { mutate, isPending } = useUpdatePinMutation();

  const handleSubmit = (data: PinUpdateValues) => {
    mutate(
      {
        pinId: pinData.id,
        payload: data,
      },
      {
        onSuccess: () => {
          form.reset();
          onClose();
          toast({
            title: "Thành công",
            description: "Chỉnh sửa thông tin Pin thành công",
            duration: 3000,
          });
        },
      },
    );
  };

  useEffect(() => {
    form.setValue(
      "slug",
      slugify(form.getValues().name, {
        lower: true,
      }),
    );
  }, [form.watch("name")]);

  useEffect(() => {
    form.reset({
      description: pinData.description,
      name: pinData.name,
      slug: pinData.slug,
    });
  }, [pinData]);

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Chỉnh sửa</DialogTitle>
          <DialogDescription>Chỉnh sửa thông tin Pin</DialogDescription>
        </DialogHeader>

        {/* Your update pin form here */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tiêu đề</FormLabel>
                  <FormControl>
                    <Input placeholder="Cô gái m52" type="text" {...field} />
                  </FormControl>
                  <FormDescription>Tiêu đề của Pin</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <PinDescriptionEditor form={form} />

            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bí danh</FormLabel>
                  <FormControl>
                    <Input placeholder="co-gai-m52" type="text" {...field} />
                  </FormControl>
                  <FormDescription>Bí danh url của Pin</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <LoadingButton isLoading={isPending} variant="normal">
              Sửa
            </LoadingButton>
          </form>
        </Form>

        <DialogFooter>
          <Button onClick={onClose}>Hủy</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
