import React from 'react';
import styled from 'styled-components';
import { Plus, Compass } from 'lucide-react';
import ServerIcon from './ServerIcon';
import { useAppSelector } from '../../hooks/redux';

const Container = styled.div`
  width: 72px;
  background: ${({ theme }) => theme.colors.background.tertiary};
  padding: ${({ theme }) => theme.spacing.sm};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const Separator = styled.div`
  height: 2px;
  width: 32px;
  background: ${({ theme }) => theme.colors.background.secondary};
  margin: ${({ theme }) => theme.spacing.xs} 0;
`;

const ServerList: React.FC = () => {
  const servers = useAppSelector(state => state.servers.items);

  return (
    <Container>
      <ServerIcon 
        isHome
        label="Home"
        to="/channels/@me"
      />
      <Separator />
      {servers.map(server => (
        <ServerIcon
          key={server.id}
          label={server.name}
          image={server.icon}
          to={`/channels/${server.id}`}
        />
      ))}
      <ServerIcon
        label="Add Server"
        icon={<Plus />}
        onClick={() => {/* TODO: Open create server modal */}}
      />
      <ServerIcon
        label="Explore Servers"
        icon={<Compass />}
        onClick={() => {/* TODO: Open server discovery */}}
      />
    </Container>
  );
};

export default ServerList;