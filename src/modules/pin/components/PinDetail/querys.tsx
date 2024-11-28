import { getCommentsAPI, getPinDetailAPI } from '@/apis/mediaApis';
import { DEFAULT_GC_TIME, DEFAULT_STALE_TIME } from '@/lib/constant';
import {
  queryOptions,
  useInfiniteQuery,
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

export function useQueryComments({ pinId }: { pinId: number }) {
  const getComments = async ({
    limit,
    page,
  }: {
    limit?: number;
    page?: number;
  }) => {
    try {
      const data = await getCommentsAPI({ pinId, limit, page });
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
    refetchInterval: 60 * 2000, // 1 minute
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
