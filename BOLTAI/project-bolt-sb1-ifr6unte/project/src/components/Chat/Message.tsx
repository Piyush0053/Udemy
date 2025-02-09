import React from 'react';
import styled from 'styled-components';
import { format } from 'date-fns';
import type { Message as MessageType } from '../../types';
import MessageContent from './MessageContent';

const Container = styled.div`
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.xl}`};
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};

  &:hover {
    background: ${({ theme }) => theme.colors.background.secondary};
  }
`;

const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
`;

const MessageInfo = styled.div`
  flex: 1;
`;

const Header = styled.div`
  display: flex;
  align-items: baseline;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const Username = styled.span`
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text.primary};
`;

const Timestamp = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.text.muted};
`;

interface Props {
  message: MessageType;
  showHeader?: boolean;
}

const Message: React.FC<Props> = ({ message, showHeader = true }) => {
  return (
    <Container>
      {showHeader && <Avatar src={message.author?.avatar} alt={message.author?.username} />}
      <MessageInfo>
        {showHeader && (
          <Header>
            <Username>{message.author?.username}</Username>
            <Timestamp>{format(new Date(message.createdAt), 'HH:mm')}</Timestamp>
          </Header>
        )}
        <MessageContent content={message.content} />
      </MessageInfo>
    </Container>
  );
};

export default Message;