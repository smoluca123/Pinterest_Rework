import { postCommentAPI } from '@/apis/mediaApis';
import { ApiResponsePaginationWrapper, CommentDataType } from '@/lib/types';
import {
  InfiniteData,
  QueryFilters,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

export function usePostCommentMutation({
  pinId,
  replyTo,
}: {
  pinId: number;
  replyTo?: number | null;
}) {
  const queryClient = useQueryClient();
  const postComment = async ({ content }: { content: string }) => {
    try {
      const data = await postCommentAPI({ pinId, content, replyTo });
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
      let queryFilter: QueryFilters = {};

      if (newComment.data.reply_to) {
        queryFilter = {
          queryKey: [
            'reply-comments',
            {
              id: newComment.data.media_id,
              replyTo: newComment.data.reply_to,
            },
          ],
        };

        //* Increment the replies count for the parent comment

        const parentQueryFilters: QueryFilters = {
          queryKey: [
            'comments',
            {
              id: pinId,
            },
          ],
        };
        queryClient.setQueriesData<
          InfiniteData<ApiResponsePaginationWrapper<CommentDataType[]>>
        >(parentQueryFilters, (oldData) => {
          if (!oldData) return;

          const updatedPages = oldData.pages.map((page) => ({
            ...page,
            data: {
              ...page.data,
              items: page.data.items.map((comment) =>
                comment.id === newComment.data.reply_to
                  ? { ...comment, replies: comment.replies + 1 }
                  : comment
              ),
            },
          }));

          return {
            pageParams: oldData.pageParams,
            pages: updatedPages,
          };
        });
      } else {
        queryFilter = {
          queryKey: [
            'comments',
            {
              id: pinId,
            },
          ],
        };
      }

      //*   Cancel previous queries related to the pinId
      await queryClient.cancelQueries(queryFilter);

      //* Add the new comment to the list of comments
      queryClient.setQueriesData<
        InfiniteData<ApiResponsePaginationWrapper<CommentDataType[]>>
      >(queryFilter, (oldData) => {
        if (!oldData) return;

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
