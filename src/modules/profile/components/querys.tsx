import { getCreatedPinsAPI, getSavedPinsAPI } from "@/apis/mediaApis";
import { getMeAPI, getUserProfileAPI } from "@/apis/userApis";
import { DEFAULT_STALE_TIME } from "@/lib/constant";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

export function useQueryUserProfile({ userId }: { userId: string }) {
  const fetchProfileData = async () => {
    try {
      const { data } = await getUserProfileAPI({
        userId,
      });
      return data;
    } catch (error) {
      console.log(error);
      throw new Error(error as string);
    }
  };

  const query = useQuery({
    queryKey: [
      "profile",
      {
        id: userId,
      },
    ],
    queryFn: fetchProfileData,
    staleTime: DEFAULT_STALE_TIME, // 5 minute
  });
  return query;
}

export function useQueryMe() {
  const getMe = async () => {
    try {
      const { data } = await getMeAPI();
      return data;
    } catch (error) {
      console.log(error);
      throw new Error(error as string);
    }
  };

  const query = useQuery({
    queryKey: ["profile", "me"],
    queryFn: getMe,
    staleTime: DEFAULT_STALE_TIME, // 5 minute
  });
  return query;
}

export function useGetSavedPins() {
  const getSavedPins = async ({
    page,
    limit,
  }: {
    page?: number;
    limit?: number;
  }) => {
    try {
      const data = await getSavedPinsAPI({ page, limit });
      const newItems = data.data.items.map((item) => item.media);
      return { ...data.data, items: newItems };
    } catch (error) {
      console.log(error);
      throw new Error(error as string);
    }
  };

  const query = useInfiniteQuery({
    queryKey: ["pins", "saved"],
    queryFn: ({ pageParam }) => getSavedPins({ page: pageParam }),
    getNextPageParam: ({ currentPage, totalPage }) => {
      return currentPage < totalPage ? currentPage + 1 : undefined;
    },
    staleTime: DEFAULT_STALE_TIME, // 5 minute
    initialPageParam: 1,
  });
  return query;
}

export function useGetCreatedPins({ userId }: { userId: number }) {
  const getSavedPins = async ({
    page,
    limit,
    keyword,
  }: {
    keyword?: string;
    page?: number;
    limit?: number;
  }) => {
    try {
      const data = await getCreatedPinsAPI({ page, limit, userId, keyword });
      return data.data;
    } catch (error) {
      console.log(error);
      throw new Error(error as string);
    }
  };

  const query = useInfiniteQuery({
    queryKey: [
      "pins",
      "created",
      {
        id: userId,
      },
    ],
    queryFn: ({ pageParam }) => getSavedPins({ page: pageParam }),
    getNextPageParam: ({ currentPage, totalPage }) => {
      return currentPage < totalPage ? currentPage + 1 : undefined;
    },
    staleTime: DEFAULT_STALE_TIME, // 5 minute
    initialPageParam: 1,
  });
  return query;
}
