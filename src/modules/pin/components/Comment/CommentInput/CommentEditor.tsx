import { EditorContent } from "@tiptap/react";
import UserAvatar from "@/components/UserAvatar";
import "./style.css";
import { usePostCommentMutation } from "@/modules/pin/components/Comment/CommentInput/mutations";
import { Navigate, useParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { selectAuth } from "@/redux/slices/authSlice";
import useCommentEditor from "@/modules/pin/components/Comment/CommentInput/useCommentEditor";
import { setAuthDialogOpen } from "@/redux/slices/dialogSlice";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CommentEditor({
  replyTo,
}: {
  replyTo?: number | null;
}) {
  const { pinId } = useParams();
  if (!pinId) return <Navigate to="/" replace />; // Add error handling for invalid pinId

  const { user } = useAppSelector(selectAuth);
  const { toast } = useToast();
  const dispatch = useAppDispatch();

  const { editor, input } = useCommentEditor();

  const { mutate, isPending } = usePostCommentMutation({
    pinId: +pinId,
    replyTo,
  });

  const handlePostComment = () => {
    mutate(
      {
        content: input,
      },
      {
        onSuccess: (data) => {
          // Clear the editor and reset input field after successful comment post
          editor?.commands.clearContent();
          toast({
            title: data.message,
            description: "Your comment has been posted.",
            duration: 3000,
          });
        },
      },
    );
  };

  return (
    <div className="">
      {!user && (
        <p className="text-center text-black">
          Bạn cần{" "}
          <span
            className="font-medium cursor-pointer text-primary"
            onClick={() =>
              dispatch(
                setAuthDialogOpen({
                  dialogType: "signin",
                  isOpen: true,
                }),
              )
            }
          >
            đăng nhập
          </span>{" "}
          để bình luận.
        </p>
      )}

      {user && (
        <div className="flex gap-5">
          <UserAvatar
            username={user?.username || ""}
            userAvatarUrl={user?.avatar || ""}
            className="hidden sm:inline"
          />
          <EditorContent
            editor={editor}
            className="max-h-[20rem] w-full overflow-y-auto rounded-md border-1 border-black/40 bg-white px-5 py-2 text-black"
          />
          <Button
            disabled={isPending}
            onClick={handlePostComment}
            className="h-auto"
          >
            {isPending ? (
              <Loader2 className="mx-auto size-5 animate-spin" />
            ) : (
              "Gửi"
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
