import { Input } from "@/components/ui/input";
import { useAppDispatch } from "@/redux/hooks";
import { setPinFilters } from "@/redux/slices/searchSlice";
import { useDebounce } from "@uidotdev/usehooks";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";

export default function SearchBox() {
  const [value, setValue] = useState("");
  const dispatch = useAppDispatch();

  const debounceValue = useDebounce(value, 300);

  useEffect(() => {
    dispatch(setPinFilters({ keywords: debounceValue }));
  }, [debounceValue]);

  return (
    <div className="relative flex-1">
      <Search className="absolute left-2 top-1/2 -translate-y-1/2" />
      <Input
        placeholder="Tìm kiếm..."
        className="ps-10"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
    </div>
  );
}
