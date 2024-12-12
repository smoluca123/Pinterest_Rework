import { getPinsAPI } from "@/apis/mediaApis";
import { DEFAULT_STALE_TIME } from "@/lib/constant";
import { FetchQueryOptions, useInfiniteQuery } from "@tanstack/react-query";

export const getPins = async ({
  keyword,
  page = 1,
  limit = 10,
}: {
  keyword?: string;
  page?: number;
  limit?: number;
}) => {
  try {
    const data = await getPinsAPI({ page, limit, keyword });
    return data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export function useQueryPins({ keyword = "" }: { keyword?: string }) {
  const query = useInfiniteQuery({
    queryKey: [
      "pins",
      "for-you",
      {
        keyword,
      },
    ],
    queryFn: ({ pageParam }) => getPins({ page: pageParam, keyword }),
    getNextPageParam: ({ currentPage, totalPage }) => {
      return currentPage < totalPage ? currentPage + 1 : undefined;
    },
    initialPageParam: 1,
    staleTime: DEFAULT_STALE_TIME, // 5 minute
  });
  return query;
}

export function getPrefetchQueryPinsOptions({
  page = 1,
  options,
}: {
  page?: number;
  options?: Omit<FetchQueryOptions, "queryKey" | "queryFn">;
}) {
  const defaultQueryFilters: FetchQueryOptions = {
    queryKey: ["pins", "for-you", String(page)],
    queryFn: () => getPins({ page }),
    staleTime: 60 * 2000, // 2 minute
    gcTime: 60 * 2000, // 2 minute
    ...options,
  };
  return defaultQueryFilters;
}
