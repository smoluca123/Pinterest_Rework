import { Pins } from "@/components/Pin";
import { useQueryPins } from "@/components/Pin/querys";

export default function PinsList() {
  const queryPins = useQueryPins();

  return <Pins infinitePinsData={queryPins} />;
}
