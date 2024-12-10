import UserAvatar from "@/components/UserAvatar";
import UsernameLink from "@/components/UsernameLink";
import useTimeDistance from "@/hooks/useTimeDistance";
import { CommentDataType } from "@/lib/types";
import { CommentEditor } from "@/modules/pin/components/Comment/CommentInput";
import CommentMoreButton from "@/modules/pin/components/Comment/CommentMoreButton";
import { useAppSelector } from "@/redux/hooks";
import { selectAuth } from "@/redux/slices/authSlice";
import { useState } from "react";
import xss from "xss";

export default function CommentLayout({
  commentData,
}: {
  commentData: CommentDataType;
}) {
  const [isReplying, setIsReplying] = useState(false);
  const [replyingTo, setReplyingTo] = useState<number | null>(null);

  const { user } = useAppSelector(selectAuth);
  const distanceToNow = useTimeDistance({ dateString: commentData.created_at });
  return (
    <div className="flex w-full gap-4">
      <UsernameLink userData={commentData.user}>
        <UserAvatar
          userAvatarUrl={commentData.user.avatar}
          username={commentData.user.username}
        />
      </UsernameLink>
      <div className="space-y-2 overflow-hidden">
        <div className="flex items-center gap-x-2">
          {/* Comment Content */}
          <div className="rounded-md bg-gray-100 p-3 text-black">
            <UsernameLink userData={commentData.user}>
              <h3 className="text-sm font-medium">
                {commentData.user.full_name}
              </h3>
            </UsernameLink>
            <article
              className="whitespace-pre-line break-words"
              dangerouslySetInnerHTML={{
                __html: xss(commentData.content),
              }}
            ></article>
          </div>

          {/* Comment More Button */}
          {commentData.user.id === user?.id && (
            <CommentMoreButton comment={commentData} />
          )}
        </div>

        <div className="flex gap-x-3">
          <p className="text-xs text-muted-foreground dark:text-muted">
            {distanceToNow}
          </p>
          <button
            className="text-xs font-medium text-muted-foreground hover:text-gray-800 dark:text-muted"
            onClick={() => {
              setIsReplying((prev) => !prev);
              setReplyingTo((prev) =>
                prev
                  ? null
                  : commentData.reply_to
                    ? commentData.reply_to
                    : commentData.id,
              );
            }}
          >
            Trả lời
          </button>
        </div>

        {isReplying && <CommentEditor replyTo={replyingTo} />}
      </div>
    </div>
  );
}
