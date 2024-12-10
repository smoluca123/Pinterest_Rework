import { getCommentsAPI, getPinDetailAPI } from '@/apis/mediaApis';
import { DEFAULT_GC_TIME, DEFAULT_STALE_TIME } from '@/lib/constant';
import { ApiResponsePaginationWrapper, CommentDataType } from '@/lib/types';
import {
  InfiniteData,
  QueryKey,
  queryOptions,
  useInfiniteQuery,
  UseInfiniteQueryOptions,
  useQuery,
  UseQueryOptions,
} from '@tanstack/react-query';

export const getPinDetail = async ({ pinId }: { pinId: number }) => {
  try {
    const data = await getPinDetailAPI(pinId);
    return data;
  } catch (error) {
    console.log(error);
    throw new Error(error as string);
  }
};

export default function useQueryPinDetail({ pinId }: { pinId: number }) {
  const query = useQuery({
    queryKey: [
      'pinDetail',
      {
        id: pinId,
      },
    ],
    queryFn: () => getPinDetail({ pinId }),
  });
  return query;
}

export function useQueryComments(
  {
    pinId,
    replyTo,
  }: {
    pinId: number;
    replyTo?: number | null;
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
  const getComments = async ({
    limit,
    page,
  }: {
    limit?: number;
    page?: number;
  }) => {
    try {
      const data = await getCommentsAPI({ pinId, limit, page, replyTo });
      return data;
    } catch (error) {
      console.log(error);
      throw new Error(error as string);
    }
  };

  const query = useInfiniteQuery({
    queryKey: [
      'comments',
      {
        id: pinId,
      },
    ],
    queryFn: ({ pageParam }) => getComments({ page: pageParam }),
    getNextPageParam: ({ data }) => {
      return data.currentPage < data.totalPage
        ? data.currentPage + 1
        : undefined;
    },
    initialPageParam: 1,
    refetchInterval: 60 * 2000, // 2 minute
    staleTime: 60 * 2000,
    ...options,
  });
  return query;
}

export function getPrefetchQueryPinDetailOptions({
  pinId,
  options,
}: {
  pinId: number;
  options?: Omit<UseQueryOptions, 'queryKey' | 'queryFn'>;
}) {
  return queryOptions({
    queryKey: [
      'pinDetail',
      {
        id: pinId,
      },
    ],
    queryFn: () => getPinDetail({ pinId }),
    staleTime: DEFAULT_STALE_TIME, // 5 minute
    gcTime: DEFAULT_GC_TIME, // 5 minute
    ...options,
  });
}
