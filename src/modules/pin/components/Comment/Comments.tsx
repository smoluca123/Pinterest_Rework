import InfiniteScrollContainer from '@/components/InfiniteScrollContainer';
import { socket } from '@/lib/socket';
import { ApiResponsePaginationWrapper, CommentDataType } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Comment } from '@/modules/pin/components/Comment';
import { useQueryComments } from '@/modules/pin/components/PinDetail/querys';
import { useAppSelector } from '@/redux/hooks';
import { selectAuth } from '@/redux/slices/authSlice';
import {
  InfiniteData,
  QueryFilters,
  useQueryClient,
} from '@tanstack/react-query';
import { ChevronUp, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';

export default function Comments() {
  const [showComments, setShowComments] = useState<boolean>(true);
  const { user } = useAppSelector(selectAuth);

  const queryClient = useQueryClient();

  const { pinId } = useParams();
  if (!pinId) return <Navigate to="/" replace />;

  const { data, isFetching, fetchNextPage, hasNextPage } = useQueryComments({
    pinId: +pinId,
  });

  // Socket connection and event handling new comment
  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }

    socket.emit('subMediaID', pinId);
    socket.on('newComment', async (comment: CommentDataType) => {
      if (comment.user_id === user?.id) return;

      const queryFilter: QueryFilters = {
        queryKey: [
          'comments',
          {
            id: +pinId,
          },
        ],
      };

      await queryClient.cancelQueries(queryFilter);

      queryClient.setQueriesData<
        InfiniteData<ApiResponsePaginationWrapper<CommentDataType[]>>
      >(queryFilter, (oldData) => {
        const pageSize = (oldData && oldData.pages.length - 1) || 0;
        const lastPage = oldData?.pages[pageSize];
        if (lastPage) {
          return {
            pageParams: oldData.pageParams,
            pages: [
              ...oldData.pages.slice(0, -1),
              {
                ...lastPage,
                data: {
                  ...lastPage.data,
                  items: [...lastPage.data.items, comment],
                },
              },
            ],
          };
        }
      });
    });
  }, []);

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
                <Comment key={comment.id} commentData={comment} />
              ))
            )}
          </div>
        )}
      </InfiniteScrollContainer>
      {isFetching && <Loader2 className="mx-auto animate-spin text-primary" />}
    </div>
  );
}
