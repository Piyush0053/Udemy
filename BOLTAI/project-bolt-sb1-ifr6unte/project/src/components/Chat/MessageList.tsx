import React from 'react';
import styled from 'styled-components';
import { useAppSelector } from '../../hooks/redux';
import Message from './Message';
import MessageGroup from './MessageGroup';
import { groupMessagesByDate } from '../../utils/messageUtils';

const Container = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  height: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: column-reverse;
`;

const DateDivider = styled.div`
  text-align: center;
  margin: ${({ theme }) => theme.spacing.md} 0;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    top: 50%;
    height: 1px;
    background: ${({ theme }) => theme.colors.background.secondary};
    z-index: 0;
  }
`;

const DateText = styled.span`
  background: ${({ theme }) => theme.colors.background.primary};
  padding: 0 ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.text.muted};
  font-size: 12px;
  position: relative;
  z-index: 1;
`;

const MessageList: React.FC = () => {
  const messages = useAppSelector(state => state.messages.items);
  const groupedMessages = groupMessagesByDate(messages);

  return (
    <Container>
      {Object.entries(groupedMessages).map(([date, messages]) => (
        <React.Fragment key={date}>
          <DateDivider>
            <DateText>{date}</DateText>
          </DateDivider>
          {messages.map((message, index) => (
            <MessageGroup key={message.id} messages={[message]} />
          ))}
        </React.Fragment>
      ))}
    </Container>
  );
};

export default MessageList;