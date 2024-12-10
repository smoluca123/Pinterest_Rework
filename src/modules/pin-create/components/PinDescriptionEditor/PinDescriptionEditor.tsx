import { Label } from "@/components/ui/label";
import { EditorContent } from "@tiptap/react";
import "./editor.css";
import { cn } from "@/lib/utils";
import { Control, useController } from "react-hook-form";
import { UseFormReturn } from "react-hook-form";
import usePinDescriptionEditor from "./usePinDescriptionEditor";
import { PinCreateValues, PinUpdateValues } from "@/lib/validations";

interface Props {
  form: UseFormReturn<PinCreateValues> | UseFormReturn<PinUpdateValues>;
}

export default function PinDescriptionEditor({ form }: Props) {
  const { field } = useController({
    name: "description",
    control: form.control as Control<PinCreateValues | PinUpdateValues>,
  });

  const editor = usePinDescriptionEditor({
    onChange: field.onChange,
    value: field.value,
  });

  return (
    <div className="w-full space-y-2">
      <Label>Mô tả</Label>
      <EditorContent
        editor={editor}
        className={cn(
          "destiptap flex max-h-[20rem] min-h-16 w-full overflow-y-auto rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        )}
      />
    </div>
  );
}
