import { CommentDataType } from '@/lib/types';
import { useState } from 'react';
import { Socket } from 'socket.io-client';

export function useHasNewComment({
  socket,
  pinId,
}: {
  socket: Socket;
  pinId: number;
}) {
  const [hasNewComment, setHasNewComment] = useState(false);
  const [newComment, setNewComment] = useState<CommentDataType | null>(null);

  const handleNewComment = (comment: CommentDataType) => {
    setHasNewComment(true);
    setNewComment(comment);
  };

  const resetState = () => {
    setHasNewComment(false);
    setNewComment(null);
  };

  const handleSubscribeMediaId = () => {
    socket.emit('subMediaID', pinId);
  };

  const handleListeningToNewComments = () => {
    socket.on('newComment', handleNewComment);
  };

  return {
    hasNewComment,
    newComment,
    resetState,
    handleSubscribeMediaId,
    handleListeningToNewComments,
  };
}
