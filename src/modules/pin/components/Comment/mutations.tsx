import { removeCommentAPI } from '@/apis/mediaApis';
import { ApiResponsePaginationWrapper, CommentDataType } from '@/lib/types';
import {
  InfiniteData,
  QueryFilters,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

export function useDeleteCommentMutation({
  comment,
}: {
  comment: CommentDataType;
}) {
  const queryClient = useQueryClient();
  const deleteComment = async () => {
    try {
      const data = await removeCommentAPI({
        commentId: comment.id,
      });
      return data;
    } catch (error) {
      console.log(error);
      throw new Error(error as string);
    }
  };
  const mutation = useMutation({
    mutationKey: ['delete-comment'],
    mutationFn: deleteComment,
    onSuccess: async () => {
      const queryFilters: QueryFilters = {
        queryKey: [
          'comments',
          {
            id: comment.media_id,
          },
        ],
      };

      await queryClient.cancelQueries(queryFilters);

      queryClient.setQueriesData<
        InfiniteData<ApiResponsePaginationWrapper<CommentDataType[]>>
      >(queryFilters, (oldData) => {
        if (!oldData) return;
        return {
          pageParams: oldData.pageParams,
          pages: oldData.pages.map((page) => {
            return {
              ...page,
              data: {
                ...page.data,
                items: page.data.items.filter((c) => c.id !== comment.id),
              },
            };
          }),
        };
      });
    },
  });
  return mutation;
}
