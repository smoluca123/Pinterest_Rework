import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import UserAvatar from "@/components/UserAvatar";
import {
  ApiResponsePaginationWrapper,
  PinDataType,
  UserDataWithTokenType,
} from "@/lib/types";
import ProfileTabs from "@/modules/profile/components/ProfileTabs";
import { InfiniteData, UseInfiniteQueryResult } from "@tanstack/react-query";
import { memo } from "react";

export default memo(function ProfileLayout({
  userData,
  savedPinsQuery,
  createdPinsQuery,
}: {
  userData: UserDataWithTokenType;
  savedPinsQuery: UseInfiniteQueryResult<
    InfiniteData<ApiResponsePaginationWrapper<PinDataType[]>["data"], unknown>,
    Error
  >;
  createdPinsQuery: UseInfiniteQueryResult<
    InfiniteData<ApiResponsePaginationWrapper<PinDataType[]>["data"], unknown>,
    Error
  >;
}) {
  return (
    <div className="py-4">
      <div className="mx-auto rounded-full shadow-lg w-fit">
        <UserAvatar
          userAvatarUrl={userData.avatar}
          username={userData.username}
          className="mx-auto size-40"
        />
      </div>

      <div className="space-y-2 text-center">
        <h1 className="mx-auto line-clamp-1 max-w-[20rem] truncate whitespace-pre-line break-words text-2xl font-semibold">
          {userData.full_name}
        </h1>
        <p className="font-medium">@{userData.username}</p>
        <p className="text-md text-muted-foreground">0 pin đã đăng</p>
        <div className="mx-auto w-fit">
          <Button>Chỉnh sửa hồ sơ</Button>
        </div>
        <div className="mt-2">
          <Separator className="my-4" />
        </div>
        <ProfileTabs
          savedPinsQuery={savedPinsQuery}
          createdPinsQuery={createdPinsQuery}
        />
      </div>
    </div>
  );
});
