import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PinDataType } from "@/lib/types";
import { UpdatePinDialog } from "@/modules/pin/components/PinDetail/PinUpdate";
import RemovePinDialog from "@/modules/pin/components/PinDetail/RemovePinDialog";
import { Ellipsis } from "lucide-react";
import { useState } from "react";

export default function PinMoreButtons({ pinData }: { pinData: PinDataType }) {
  const [openRemovePinDialog, setOpenRemovePinDialog] = useState(false);
  const [openEditPinDialog, setOpenEditPinDialog] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="p-2 text-black rounded-full size-10 hover:bg-gray-200">
            <Ellipsis className="size-full" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right" align="start">
          <DropdownMenuLabel>Settings</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => setOpenEditPinDialog(true)}
            className="cursor-pointer"
          >
            Chỉnh sửa
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setOpenRemovePinDialog(true)}
            className="cursor-pointer text-primary"
          >
            Xóa
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <RemovePinDialog
        open={openRemovePinDialog}
        onClose={() => {
          setOpenRemovePinDialog(false);
        }}
        pinData={pinData}
      />
      <UpdatePinDialog
        open={openEditPinDialog}
        onClose={() => {
          setOpenEditPinDialog(false);
        }}
        pinData={pinData}
      />
    </>
  );
}
