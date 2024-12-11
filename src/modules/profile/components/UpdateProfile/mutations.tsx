import { updateAvatarAPI, updateProfileAPI } from "@/apis/userApis";
import { UserDataType } from "@/lib/types";
import { ProfileUpdateValues } from "@/lib/validations";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { selectAuth, updateUser } from "@/redux/slices/authSlice";
import {
  QueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

export function useUpdateProfileMutaion() {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  const updateProfile = async (values: ProfileUpdateValues) => {
    try {
      const data = await updateProfileAPI({
        newData: values,
      });
      return data.data;
    } catch (error) {
      console.log(error);
      throw new Error(error as string);
    }
  };
  const mutation = useMutation({
    mutationKey: ["profile", "update"],
    mutationFn: updateProfile,
    onSuccess: (updatedUser) => {
      const queryFilters: QueryFilters = {
        queryKey: ["profile", "me"],
      };

      queryClient.cancelQueries(queryFilters);

      //   Update the user's profile in the cache after successful update
      queryClient.setQueriesData<UserDataType>(queryFilters, (oldData) => {
        if (!oldData) return;

        return updatedUser;
      });

      //   Update the user's profile in the Redux store after successful update
      dispatch(updateUser(updatedUser));
    },
  });
  return mutation;
}

export function useUpdateAvatarMutation() {
  const queryClient = useQueryClient();
  const { user } = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();
  const updateAvatar = async ({
    userId,
    avatarFile,
  }: {
    userId: number;
    avatarFile: File;
  }) => {
    try {
      const { data } = await updateAvatarAPI({ userId, avatarFile });
      return data;
    } catch (error) {
      console.log(error);
      throw new Error(error as string);
    }
  };
  const mutation = useMutation({
    mutationKey: ["profile", "updateAvatar"],
    mutationFn: updateAvatar,
    onSuccess: (updatedUser) => {
      if (!user) return;
      const queryFilters: QueryFilters = {
        queryKey: ["profile", "me"],
      };

      queryClient.cancelQueries(queryFilters);

      //   Update the user's profile in the cache after successful update
      queryClient.setQueriesData<UserDataType>(queryFilters, (oldData) => {
        if (!oldData) return;

        const newData = { ...oldData, avatar: updatedUser.avatar };
        return newData;
      });

      //   Update the user's profile in the Redux store after successful update
      dispatch(updateUser({ ...user, ...updatedUser }));
    },
  });
  return mutation;
}
