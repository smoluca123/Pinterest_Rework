import { removeCommentAPI, updateCommentAPI } from '@/apis/mediaApis';
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
      let queryFilters: QueryFilters = {};
      if (comment.reply_to) {
        queryFilters = {
          queryKey: [
            'reply-comments',
            {
              id: comment.media_id,
              replyTo: comment.reply_to,
            },
          ],
        };

        //* Decrease the replies count for the parent comment

        const parentQueryFilters: QueryFilters = {
          queryKey: [
            'comments',
            {
              id: comment.media_id,
            },
          ],
        };
        queryClient.setQueriesData<
          InfiniteData<ApiResponsePaginationWrapper<CommentDataType[]>>
        >(parentQueryFilters, (oldData) => {
          if (!oldData) return;
          return {
            pageParams: oldData.pageParams,
            pages: oldData.pages.map((page) => ({
              ...page,
              data: {
                ...page.data,
                items: page.data.items.map((c) => {
                  if (c.id === comment.reply_to) {
                    return {
                      ...c,
                      replies: c.replies - 1,
                    };
                  }
                  return c;
                }),
              },
            })),
          };
        });
      } else {
        queryFilters = {
          queryKey: [
            'comments',
            {
              id: comment.media_id,
            },
          ],
        };
      }

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

export function useEditCommentMutation({
  comment,
}: {
  comment: CommentDataType;
}) {
  const queryClient = useQueryClient();

  const handleUpdateComment = async ({
    newCommentContent,
  }: {
    newCommentContent: string;
  }) => {
    try {
      const data = await updateCommentAPI({
        commentId: comment.id,
        content: newCommentContent,
      });
      return data.data;
    } catch (error) {
      console.log(error);
      throw new Error(error as string);
    }
  };

  const mutation = useMutation({
    mutationKey: ['update-comment'],
    mutationFn: handleUpdateComment,
    onSuccess: async (newComment) => {
      const queryFilters: QueryFilters = {
        queryKey: [
          'comments',
          {
            id: comment.media_id,
          },
        ],
      };

      // Cancel previous queries to avoid conflicts
      await queryClient.cancelQueries(queryFilters);

      queryClient.setQueriesData<
        InfiniteData<ApiResponsePaginationWrapper<CommentDataType[]>>
      >(queryFilters, (oldData) => {
        if (!oldData) return;
        return {
          ...oldData,
          pages: oldData.pages.map((page) => {
            return {
              ...page,
              data: {
                ...page.data,
                items: page.data.items.map((c) => {
                  if (c.id === newComment.id) {
                    return newComment;
                  }
                  return c;
                }),
              },
            };
          }),
        };
      });
    },
  });

  return mutation;
}
