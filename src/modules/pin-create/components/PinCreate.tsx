import { Separator } from '@/components/ui/separator';
import PinCreateForm from '@/modules/pin-create/components/PinCreateForm';

export default function PinCreate() {
  return (
    <div className="min-h-dvh">
      <h1 className="mb-4 text-2xl font-semibold">Tạo Pin</h1>
      <Separator />

      {/* Pin Create Form */}
      <PinCreateForm className="mt-4" />
    </div>
  );
}
