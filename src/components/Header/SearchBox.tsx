import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

export default function SearchBox() {
  return (
    <div className="flex-1 relative">
      <Search className="absolute top-1/2 -translate-y-1/2 left-2" />
      <Input placeholder="Tìm kiếm Lý Vân Tư" className="ps-10" />
    </div>
  );
}
