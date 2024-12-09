import { toggleSavePinAPI } from '@/apis/mediaApis';
import { PinDataType } from '@/lib/types';
import {
  QueryFilters,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

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
      'save-pin',
      {
        id: pinData.id,
      },
    ],
    mutationFn: handleToggleSavePin,
    onSuccess: async (isSaved) => {
      const queryFilters: QueryFilters = {
        queryKey: [
          'check-saved-pin',
          {
            id: pinData.id,
          },
        ],
      };

      await queryClient.cancelQueries(queryFilters);

      queryClient.setQueriesData<boolean>(queryFilters, () => {
        return !!isSaved;
      });
    },
  });
  return mutation;
}
