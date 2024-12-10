import { toggleSavePinAPI } from "@/apis/mediaApis";
import { PinDataType } from "@/lib/types";
import {
  QueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

export function useToggleSavePinMutation({
  pinData,
}: {
  pinData: PinDataType;
}) {
  const queryClient = useQueryClient();

  const handleToggleSavePin = async () => {
    try {
      const data = await toggleSavePinAPI({ pinId: pinData.id });
      return data.data;
    } catch (error) {
      console.log(error);
      throw new Error(error as string);
    }
  };

  const mutation = useMutation({
    mutationKey: [
      "save-pin",
      {
        id: pinData.id,
      },
    ],
    mutationFn: handleToggleSavePin,
    onSuccess: async (savedPin) => {
      const queryFilters: QueryFilters = {
        queryKey: [
          "check-saved-pin",
          {
            id: pinData.id,
          },
        ],
      };

      await queryClient.cancelQueries(queryFilters);

      queryClient.setQueriesData<boolean>(queryFilters, () => {
        return !!savedPin;
      });

      queryClient.refetchQueries({ queryKey: ["pins", "saved"] });

      //
      // queryClient.setQueriesData<
      //   InfiniteData<ApiResponsePaginationWrapper<PinDataType[]>>
      // >(
      //   {
      //     queryKey: ["pins", "saved"],
      //   },
      //   (oldData) => {
      //     if (!oldData) return;
      //     const pageSize = oldData.pages.length - 1 || 0;
      //     const lastPage = oldData.pages[pageSize];
      //     if (savedPin && lastPage) {
      //       console.log(123);
      //       return {
      //         pageParams: oldData.pageParams,
      //         pages: [
      //           ...oldData.pages.slice(0, -1),
      //           {
      //             ...lastPage,
      //             data: {
      //               ...lastPage.data,
      //               items: [...lastPage.data.items, savedPin.media],
      //             },
      //           },
      //         ],
      //       };
      //     }
      //   },
      // );
    },
  });
  return mutation;
}
