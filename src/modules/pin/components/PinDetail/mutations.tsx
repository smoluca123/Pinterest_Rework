import { removePinAPI } from '@/apis/mediaApis';
import { PinDataType } from '@/lib/types';
import {
  QueryFilters,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

export function useRemovePinMutation({ pinData }: { pinData: PinDataType }) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const removePin = async () => {
    try {
      const { data } = await removePinAPI({
        pinId: pinData.id,
      });
      return data;
    } catch (error) {
      console.log(error);
      throw new Error(error as string);
    }
  };

  const mutation = useMutation({
    mutationKey: ['delete-pin'],
    mutationFn: removePin,
    onSuccess: async () => {
      const queryFilter: QueryFilters = {
        queryKey: ['pins', 'for-you'],
      };

      await queryClient.refetchQueries(queryFilter);

      navigate('/', {
        replace: true,
      });
    },
  });

  return mutation;
}
