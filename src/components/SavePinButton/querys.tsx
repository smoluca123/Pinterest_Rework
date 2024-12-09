import { getSavedPinsAPI } from '@/apis/mediaApis';
import { PinDataType } from '@/lib/types';
import { useQuery } from '@tanstack/react-query';

export function useCheckSavedPin({ pinData }: { pinData: PinDataType }) {
  const checkSavedPin = async () => {
    try {
      const data = await getSavedPinsAPI({
        pinId: pinData.id,
      });
      return data.data.items.length > 0;
    } catch (error) {
      console.log(error);
      throw new Error(error as string);
    }
  };

  const query = useQuery({
    queryKey: [
      'check-saved-pin',
      {
        id: pinData.id,
      },
    ],
    queryFn: checkSavedPin,
  });
  return query;
}
