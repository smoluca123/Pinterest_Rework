import InfiniteScrollContainer from '@/components/InfiniteScrollContainer';
import { cn } from '@/lib/utils';
import { Comment } from '@/modules/pin/components/Comment';
import { useQueryComments } from '@/modules/pin/components/PinDetail/querys';
import { ChevronUp, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';

export default function Comments() {
  const { pinId } = useParams();
  if (!pinId) return <Navigate to="/" replace />;

  const [showComments, setShowComments] = useState<boolean>(true);
  const { data, isFetching, fetchNextPage, hasNextPage } = useQueryComments({
    pinId: +pinId,
  });
  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      <div
        className="flex items-center justify-between text-black cursor-pointer"
        onClick={() => setShowComments((prev) => !prev)}
        title={showComments ? 'Ẩn nhận xét' : 'Xem nhận xét'}
      >
        <h3 className="font-medium ">Nhận xét</h3>
        <ChevronUp
          className={cn('size-6 transition', {
            'rotate-180': !showComments,
          })}
        />
      </div>
      <InfiniteScrollContainer
        rootMargin="100px"
        onBottomReached={fetchNextPage}
        isShowInViewElement={hasNextPage}
        className="flex-1 overflow-y-auto scrollbar-hide"
      >
        {/* Comments */}
        {data && (
          <div
            className={cn('opacity-100 transition space-y-4 ', {
              'opacity-0': !showComments,
            })}
          >
            {data.pages.map((page) =>
              page.data.items.map((comment) => (
                <Comment commentData={comment} />
              ))
            )}
          </div>
        )}
      </InfiniteScrollContainer>
      {isFetching && <Loader2 className="mx-auto animate-spin text-primary" />}
    </div>
  );
}
