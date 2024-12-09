import { ApiResponsePaginationWrapper, CommentDataType } from '@/lib/types';
import { useQueryComments } from '@/modules/pin/components/PinDetail/querys';
import {
  InfiniteData,
  QueryKey,
  UseInfiniteQueryOptions,
} from '@tanstack/react-query';

export function useQueryReplyComments(
  {
    commentData,
  }: {
    commentData: CommentDataType;
  },
  options?: Omit<
    UseInfiniteQueryOptions<
      ApiResponsePaginationWrapper<CommentDataType[]>, // Type của response data
      unknown, // Type của error
      InfiniteData<ApiResponsePaginationWrapper<CommentDataType[]>>, // Type của normalized data
      ApiResponsePaginationWrapper<CommentDataType[]>, // Type của raw data
      QueryKey,
      number // Type của pageParam
    >,
    'queryKey' | 'queryFn' | 'getNextPageParam' | 'initialPageParam'
  > & {
    queryKey?: QueryKey;
  }
) {
  const query = useQueryComments(
    {
      pinId: commentData.media_id,
      replyTo: commentData.id,
    },
    {
      queryKey: [
        'reply-comments',
        {
          id: commentData.media_id,
          replyTo: commentData.id,
        },
      ],
      ...options,
    }
  );
  return query;
}
