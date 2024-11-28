import UserAvatar from '@/components/UserAvatar';
import useTimeDistance from '@/hooks/useTimeDistance';
import { CommentDataType } from '@/lib/types';
import CommentMoreButton from '@/modules/pin/components/Comment/CommentMoreButton';
import { useAppSelector } from '@/redux/hooks';
import { selectAuth } from '@/redux/slices/authSlice';

interface IProps {
  commentData: CommentDataType;
}

export default function Comment({ commentData }: IProps) {
  const { user } = useAppSelector(selectAuth);
  const distanceToNow = useTimeDistance({ dateString: commentData.created_at });
  return (
    <div className="">
      <div className="flex gap-4">
        <UserAvatar
          userAvatarUrl={commentData.user.avatar}
          username={commentData.user.username}
        />
        <div className="space-y-2">
          <div className="flex items-center gap-x-2">
            {/* Comment Content */}
            <div className="p-3 text-black bg-gray-100 rounded-md">
              <h3 className="text-sm font-medium">
                {commentData.user.full_name}
              </h3>
              <article className="break-words whitespace-pre-line">
                {commentData.content}
              </article>
            </div>

            {/* Comment More Button */}
            {commentData.user.id === user?.id && (
              <CommentMoreButton comment={commentData} />
            )}
          </div>

          <div className="flex gap-x-3">
            <p className="text-xs text-muted">{distanceToNow}</p>
            <button className="text-xs font-medium text-muted hover:text-gray-800">
              Trả lời
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
