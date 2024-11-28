import { postCommentAPI } from '@/apis/mediaApis';
import { ApiResponsePaginationWrapper, CommentDataType } from '@/lib/types';
import {
  InfiniteData,
  QueryFilters,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

export function usePostCommentMutation({ pinId }: { pinId: number }) {
  const queryClient = useQueryClient();
  const postComment = async ({ content }: { content: string }) => {
    try {
      const data = await postCommentAPI({ pinId, content });
      return data;
    } catch (error) {
      console.log(error);
      throw new Error(error as string);
    }
  };

  const mutation = useMutation({
    mutationKey: [
      'post-comment',
      {
        id: pinId,
      },
    ],
    mutationFn: postComment,
    onSuccess: async (newComment) => {
      const queryFilter: QueryFilters = {
        queryKey: [
          'comments',
          {
            id: pinId,
          },
        ],
      };
      //   Cancel previous queries related to the pinId
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
                  items: [...lastPage.data.items, newComment.data],
                },
              },
            ],
          };
        }
      });
    },
  });
  return mutation;
}
