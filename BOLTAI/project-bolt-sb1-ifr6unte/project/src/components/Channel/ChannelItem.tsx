import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

interface ChannelItemProps {
  name: string;
  icon: React.ReactNode;
  to: string;
  unread?: boolean;
}

const Container = styled(Link)<{ $unread?: boolean }>`
  height: 32px;
  padding: 0 ${({ theme }) => theme.spacing.md};
  margin: 1px ${({ theme }) => theme.spacing.xs};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme, $unread }) => 
    $unread ? theme.colors.text.primary : theme.colors.text.muted};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  text-decoration: none;

  &:hover {
    background: ${({ theme }) => theme.colors.background.primary};
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;

const ChannelItem: React.FC<ChannelItemProps> = ({
  name,
  icon,
  to,
  unread
}) => (
  <Container to={to} $unread={unread}>
    {icon}
    {name}
  </Container>
);

export default ChannelItem;