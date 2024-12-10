import PinsList from "@/modules/home/components/PinsList";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <div>
      <PinsList />
    </div>
  );
}
