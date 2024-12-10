import InfiniteScrollContainer from "@/components/InfiniteScrollContainer";
import { CommentDataType } from "@/lib/types";
import CommentLayout from "@/modules/pin/components/Comment/CommentLayout";
import { useQueryReplyComments } from "@/modules/pin/components/Comment/querys";
import { Loader2 } from "lucide-react";
import { useState } from "react";

interface IProps {
  commentData: CommentDataType;
}

export default function Comment({ commentData }: IProps) {
  const [showReplies, setShowReplies] = useState(false);

  const { data, isFetching, hasNextPage, fetchNextPage } =
    useQueryReplyComments(
      {
        commentData,
      },
      {
        enabled: showReplies && commentData.replies > 0,
      },
    );

  return (
    <div className="">
      <CommentLayout commentData={commentData} />

      {/* Reply Comments */}
      {commentData.replies > 0 && (
        <div className="space-y-2 ml-14">
          <button
            className="text-sm font-medium text-black"
            onClick={() => setShowReplies((prev) => !prev)}
          >
            {!showReplies
              ? `Xem ${commentData.replies} câu trả lời`
              : "Ẩn các câu trả lời"}
          </button>

          {/* Reply comments list */}
          <div>
            <InfiniteScrollContainer
              onBottomReached={fetchNextPage}
              isShowInViewElement={hasNextPage}
              rootMargin="60px"
            >
              {showReplies &&
                data &&
                data.pages.map((page) =>
                  page.data.items.map((comment) => (
                    <CommentLayout commentData={comment} key={comment.id} />
                  )),
                )}
            </InfiniteScrollContainer>
          </div>

          {/* Loading */}
          {isFetching && (
            <Loader2 className="mx-auto size-5 animate-spin text-primary" />
          )}
        </div>
      )}
    </div>
  );
}
