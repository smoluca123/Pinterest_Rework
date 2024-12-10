import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import UserAvatar from "@/components/UserAvatar";
import UsernameLink from "@/components/UsernameLink";
import {
  ApiResponsePaginationWrapper,
  PinDataType,
  UserDataType,
} from "@/lib/types";
import ProfileSkeleton from "@/modules/profile/components/ProfileSkeleton";
import ProfileTabs from "@/modules/profile/components/ProfileTabs";
import UpdateProfileDialog from "@/modules/profile/components/UpdateProfile/UpdateProfileDialog";
import { useAppSelector } from "@/redux/hooks";
import { selectAuth } from "@/redux/slices/authSlice";
import {
  InfiniteData,
  UseInfiniteQueryResult,
  UseQueryResult,
} from "@tanstack/react-query";
import { memo, useState } from "react";

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
}

export default memo(function ProfileLayout({
  profileQuery,
  savedPinsQuery,
  createdPinsQuery,
}: IProps) {
  const { user } = useAppSelector(selectAuth);
  const { data: userData, isFetching } = profileQuery;
  const [showUpdateProfileDialog, setShowUpdateProfileDialog] =
    useState<boolean>(false);

  return (
    <>
      {/* Loading */}
      {isFetching && <ProfileSkeleton />}

      <div className="py-4">
        {userData && (
          <>
            <div className="mx-auto w-fit rounded-full shadow-lg">
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
              <p className="font-medium">
                <UsernameLink userData={userData}>
                  @{userData.username}
                </UsernameLink>
              </p>
              <p className="text-md text-muted-foreground">0 pin đã đăng</p>

              {/* Update Profile */}
              {user?.id === userData.id && (
                <div className="mx-auto w-fit">
                  {/* <Button>Chỉnh sửa hồ sơ</Button> */}
                  <Button onClick={() => setShowUpdateProfileDialog(true)}>
                    Chỉnh sửa hồ sơ
                  </Button>
                </div>
              )}
              <Separator className="!my-4" />
            </div>

            {/* Dialog */}
            <UpdateProfileDialog
              userData={userData}
              open={showUpdateProfileDialog}
              onClose={() => setShowUpdateProfileDialog(false)}
            />
          </>
        )}
        <div className="text-center">
          <ProfileTabs
            profileQuery={profileQuery}
            savedPinsQuery={savedPinsQuery}
            createdPinsQuery={createdPinsQuery}
          />
        </div>
      </div>
    </>
  );
});
