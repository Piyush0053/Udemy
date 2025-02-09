import React from 'react';
import styled from 'styled-components';
import MessageList from './MessageList';
import ChatInput from './ChatInput';
import ChatHeader from './ChatHeader';
import { useAppSelector } from '../../hooks/redux';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const Content = styled.div`
  flex: 1;
  overflow: hidden;
`;

const ChatView: React.FC = () => {
  const activeChannel = useAppSelector(state => state.channels.items.find(
    channel => channel.id === state.channels.activeChannelId
  ));

  return (
    <Container>
      <ChatHeader channel={activeChannel} />
      <Content>
        <MessageList />
      </Content>
      <ChatInput />
    </Container>
  );
};

export default ChatView;