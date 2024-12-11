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
import UpdateAvatarDialog from "@/modules/profile/components/UpdateProfile/UpdateAvatarDialog";
import UpdateProfileDialog from "@/modules/profile/components/UpdateProfile/UpdateProfileDialog";
import { useAppSelector } from "@/redux/hooks";
import { selectAuth } from "@/redux/slices/authSlice";
import {
  InfiniteData,
  UseInfiniteQueryResult,
  UseQueryResult,
} from "@tanstack/react-query";
import { Edit } from "lucide-react";
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
  const [showUpdateAvatarDialog, setShowUpdateAvatarDialog] =
    useState<boolean>(false);

  return (
    <>
      {/* Loading */}
      {isFetching && <ProfileSkeleton />}

      <div className="py-4">
        {userData && (
          <>
            <div className="relative mx-auto overflow-hidden rounded-full shadow-lg group/avatar w-fit">
              <UserAvatar
                userAvatarUrl={userData.avatar}
                username={userData.username}
                className="mx-auto size-40"
              />

              {/* Overlay */}
              <div className="absolute top-0 left-0 transition-opacity opacity-0 size-full bg-black/20 group-hover/avatar:opacity-100"></div>

              <button
                className="absolute p-2 transition-opacity -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 left-1/2 top-1/2 bg-black/40 group-hover/avatar:opacity-100"
                onClick={() => setShowUpdateAvatarDialog(true)}
              >
                <Edit className="text-white" />
              </button>
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

            {/* Dialog update profile */}
            <UpdateProfileDialog
              userData={userData}
              open={showUpdateProfileDialog}
              onClose={() => setShowUpdateProfileDialog(false)}
            />

            {/* Dialog update profile */}
            <UpdateAvatarDialog
              onClose={() => setShowUpdateAvatarDialog(false)}
              open={showUpdateAvatarDialog}
              userData={userData}
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
