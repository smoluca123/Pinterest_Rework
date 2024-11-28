import { PinDataType } from '@/lib/types';
import { getPrefetchQueryPinDetailOptions } from '@/modules/pin/components/PinDetail/querys';
import { useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

export default function PinItem({
  pinData,
}: {
  skeletonHeight?: number;
  pinData: PinDataType;
}) {
  const queryClient = useQueryClient();
  const prefetchPinDetailOptions = getPrefetchQueryPinDetailOptions({
    pinId: pinData.id,
  });

  return (
    <Link
      to={`/pin/${pinData.id}/${encodeURIComponent(pinData.slug)}`}
      onMouseEnter={() => {
        queryClient.prefetchQuery(prefetchPinDetailOptions);
      }}
      className="block w-full cursor-zoom-in"
    >
      <div className="overflow-hidden rounded-lg">
        <img
          key={pinData.id}
          src={pinData.image[0].url}
          alt=""
          className="w-full"
          loading="lazy"
        />
      </div>
    </Link>
  );
}
