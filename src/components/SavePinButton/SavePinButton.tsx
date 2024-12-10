import { useToggleSavePinMutation } from "@/components/SavePinButton/mutations";
import { useCheckSavedPin } from "@/components/SavePinButton/querys";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { PinDataType } from "@/lib/types";
import { Loader2 } from "lucide-react";

export default function SavePinButton({ pinData }: { pinData: PinDataType }) {
  const { toast } = useToast();
  const { data: isSaved, isLoading } = useCheckSavedPin({ pinData });
  const { mutate, isPending } = useToggleSavePinMutation({ pinData });
  return (
    <>
      <Button
        disabled={isPending || isLoading}
        className=""
        variant={
          isLoading || isPending ? "outline" : isSaved ? "normal" : "default"
        }
        onClick={() =>
          mutate(undefined, {
            onSuccess: (data) => {
              toast({
                title: "Thành công",
                description: `${data ? "Đã lưu" : "Đã bỏ lưu"} thành công!`,
                duration: 3000,
              });
            },
          })
        }
      >
        {isLoading ||
          (isPending && (
            <Loader2 className="mx-auto size-5 animate-spin text-foreground" />
          ))}

        {isSaved ? "Bỏ lưu" : "Lưu"}
      </Button>
    </>
  );
}
