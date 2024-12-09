import { pinCreateAPI } from '@/apis/mediaApis';
import { PinCreateValues } from '@/lib/validations';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

export function usePinCreateMutation() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const pinCreate = async ({ payload }: { payload: PinCreateValues }) => {
    try {
      // console.log(payload);
      const data = await pinCreateAPI(payload);
      return data.data;
    } catch (error) {
      console.log(error);
      throw new Error(error as string);
    }
  };

  const mutation = useMutation({
    mutationKey: ['pins', 'create'],
    mutationFn: pinCreate,
    onSuccess: (data) => {
      queryClient.refetchQueries({
        queryKey: ['pins', 'for-you'],
      });

      navigate(`/pin/${data.id}/${data.slug}`);
    },
  });
  return mutation;
}
