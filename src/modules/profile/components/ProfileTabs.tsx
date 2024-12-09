import { Pins } from "@/components/Pin";
import { ApiResponsePaginationWrapper, PinDataType } from "@/lib/types";
import { Tab, Tabs } from "@nextui-org/tabs";
import { InfiniteData, UseInfiniteQueryResult } from "@tanstack/react-query";

export default function ProfileTabs({
  savedPinsQuery,
  createdPinsQuery,
}: {
  savedPinsQuery: UseInfiniteQueryResult<
    InfiniteData<ApiResponsePaginationWrapper<PinDataType[]>["data"], unknown>,
    Error
  >;
  createdPinsQuery: UseInfiniteQueryResult<
    InfiniteData<ApiResponsePaginationWrapper<PinDataType[]>["data"], unknown>,
    Error
  >;
  //   createdPins: any[];
}) {
  const tabs = [
    {
      id: "pin-created",
      label: "Đã tạo",
      content: () => <Pins infinitePinsData={savedPinsQuery} />,
    },
    {
      id: "pin-saved",
      label: "Đã lưu",
      content: () => <Pins infinitePinsData={createdPinsQuery} />,
    },
  ];
  return (
    <Tabs variant="underlined" items={tabs}>
      {tabs.map((tab) => (
        <Tab key={tab.id} title={tab.label}>
          {tab.content()}
        </Tab>
      ))}
    </Tabs>
  );
}
