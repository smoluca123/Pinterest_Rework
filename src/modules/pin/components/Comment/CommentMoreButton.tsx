import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { CommentDataType } from '@/lib/types';
import { cn } from '@/lib/utils';
import DeleteCommentDialog from '@/modules/pin/components/Comment/DeleteCommentDialog';
import { Ellipsis } from 'lucide-react';
import { useState } from 'react';

interface IProps {
  comment: CommentDataType;
  className?: string;
}

export default function CommentMoreButton({ comment, className }: IProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className={cn('', className)}>
          <Ellipsis className="text-muted" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-white border-border/20">
          <DropdownMenuItem className="hover:!bg-gray-200">
            <button className="w-full text-black">Chỉnh sửa</button>
          </DropdownMenuItem>
          <DropdownMenuItem className="hover:!bg-gray-200">
            <button
              className="w-full text-primary"
              onClick={() => setShowDeleteDialog(true)}
            >
              Xóa
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DeleteCommentDialog
        open={showDeleteDialog}
        commentData={comment}
        onClose={() => setShowDeleteDialog(false)}
      />
    </>
  );
}
