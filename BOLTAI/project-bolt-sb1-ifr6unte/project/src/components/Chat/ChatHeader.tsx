import React from 'react';
import styled from 'styled-components';
import { Hash, Users, Pin, Bell, HelpCircle } from 'lucide-react';
import type { Channel } from '../../types';

const Container = styled.div`
  height: 48px;
  padding: 0 ${({ theme }) => theme.spacing.md};
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 1px 0 rgba(0,0,0,0.2);
  background: ${({ theme }) => theme.colors.background.primary};
`;

const ChannelInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const ChannelName = styled.h3`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.text.muted};
`;

interface Props {
  channel?: Channel;
}

const ChatHeader: React.FC<Props> = ({ channel }) => {
  if (!channel) return null;

  return (
    <Container>
      <ChannelInfo>
        <Hash size={24} />
        <ChannelName>{channel.name}</ChannelName>
      </ChannelInfo>
      <Actions>
        <Bell size={20} />
        <Pin size={20} />
        <Users size={20} />
        <HelpCircle size={20} />
      </Actions>
    </Container>
  );
};

export default ChatHeader;