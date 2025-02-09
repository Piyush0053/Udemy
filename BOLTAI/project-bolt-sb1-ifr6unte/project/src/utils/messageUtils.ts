import { format } from 'date-fns';
import type { Message } from '../types';

export const groupMessagesByDate = (messages: Message[]) => {
  return messages.reduce((groups, message) => {
    const date = format(new Date(message.createdAt), 'MMM dd, yyyy');
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(message);
    return groups;
  }, {} as Record<string, Message[]>);
};

export const shouldShowMessageHeader = (
  currentMessage: Message,
  previousMessage?: Message
) => {
  if (!previousMessage) return true;
  
  const timeDiff = new Date(currentMessage.createdAt).getTime() -
    new Date(previousMessage.createdAt).getTime();
  
  return (
    currentMessage.author.id !== previousMessage.author.id ||
    timeDiff > 5 * 60 * 1000 // 5 minutes
  );
};