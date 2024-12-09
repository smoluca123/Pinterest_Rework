import { pinUpdateAPI } from "@/apis/mediaApis";
import { ApiResponseWrapper, PinDataType } from "@/lib/types";
import { PinUpdateValues } from "@/lib/validations";
import {
  QueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

export function useUpdatePinMutation() {
  const queryClient = useQueryClient();

  const updatePin = async ({
    pinId,
    payload,
  }: {
    pinId: number;
    payload: PinUpdateValues;
  }) => {
    try {
      const response = await pinUpdateAPI({
        pinId,
        payload,
      });
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error(error as string);
    }
  };

  const mutation = useMutation({
    mutationKey: ["pins", "update"],
    mutationFn: updatePin,
    onSuccess: async (newPin) => {
      const queryFilters: QueryFilters = {
        queryKey: [
          "pinDetail",
          {
            id: newPin.id,
          },
        ],
      };

      await queryClient.cancelQueries(queryFilters);

      queryClient.setQueriesData<ApiResponseWrapper<PinDataType>>(
        queryFilters,
        (oldData) => {
          if (!oldData) return;

          return {
            ...oldData,
            data: newPin,
          };
        },
      );
    },
  });
  return mutation;
}
