import { Pins } from "@/components/Pin";
import { useQueryPins } from "@/components/Pin/querys";
import { useAppSelector } from "@/redux/hooks";
import { selectSearch } from "@/redux/slices/searchSlice";

export default function PinsList() {
  const { pinFilters } = useAppSelector(selectSearch);
  const queryPins = useQueryPins({ keyword: pinFilters.keywords });

  return <Pins infinitePinsData={queryPins} />;
}
