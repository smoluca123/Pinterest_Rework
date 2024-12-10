import { getPinsAPI } from "@/apis/mediaApis";
import { DEFAULT_STALE_TIME } from "@/lib/constant";
import { FetchQueryOptions, useInfiniteQuery } from "@tanstack/react-query";

export const getPins = async ({ page = 1 }: { page?: number }) => {
  try {
    const data = await getPinsAPI({ page });
    return data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export function useQueryPins() {
  const query = useInfiniteQuery({
    queryKey: ["pins", "for-you"],
    queryFn: ({ pageParam }) => getPins({ page: pageParam }),
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
