import { Pins } from "@/components/Pin";
import {
  ApiResponsePaginationWrapper,
  PinDataType,
  UserDataType,
} from "@/lib/types";
import { useAppSelector } from "@/redux/hooks";
import { selectAuth } from "@/redux/slices/authSlice";
import { Tab, Tabs } from "@nextui-org/tabs";
import {
  InfiniteData,
  UseInfiniteQueryResult,
  UseQueryResult,
} from "@tanstack/react-query";
import { Fragment } from "react/jsx-runtime";

interface IProps {
  profileQuery: UseQueryResult<UserDataType, Error>;
  savedPinsQuery?: UseInfiniteQueryResult<
    InfiniteData<ApiResponsePaginationWrapper<PinDataType[]>["data"], unknown>,
    Error
  >;
  createdPinsQuery: UseInfiniteQueryResult<
    InfiniteData<ApiResponsePaginationWrapper<PinDataType[]>["data"], unknown>,
    Error
  >;
  //   createdPins: any[];
}

export default function ProfileTabs({
  profileQuery,
  savedPinsQuery,
  createdPinsQuery,
}: IProps) {
  const { user } = useAppSelector(selectAuth);

  const tabs = [
    {
      id: "pin-created",
      label: "Đã tạo",
      content: <Pins infinitePinsData={createdPinsQuery} />,
    },
    {
      id: "pin-saved",
      label: "Đã lưu",
      content: (
        <>{savedPinsQuery && <Pins infinitePinsData={savedPinsQuery} />}</>
      ),
      meOnly: true,
    },
  ];

  const { data: userData } = profileQuery;

  return (
    <Tabs
      variant="underlined"
      items={tabs}
      className="!mt-0"
      classNames={{
        cursor: "!bg-primary",
      }}
    >
      {tabs.map((tab) => (
        <Fragment key={tab.id}>
          {(!tab.meOnly || user?.id == (userData?.id || -1)) && (
            <Tab title={tab.label}>{tab.content}</Tab>
          )}
        </Fragment>
      ))}
    </Tabs>
  );
}
