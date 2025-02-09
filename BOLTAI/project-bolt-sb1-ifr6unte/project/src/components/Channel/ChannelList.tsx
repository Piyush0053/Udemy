import React from 'react';
import styled from 'styled-components';
import { Hash, Volume2, Plus, Settings } from 'lucide-react';
import { useAppSelector } from '../../hooks/redux';
import ChannelCategory from './ChannelCategory';
import ChannelItem from './ChannelItem';

const Container = styled.div`
  width: 240px;
  background: ${({ theme }) => theme.colors.background.secondary};
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  height: 48px;
  padding: 0 ${({ theme }) => theme.spacing.md};
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 1px 0 rgba(0,0,0,0.2);
  color: ${({ theme }) => theme.colors.text.primary};
`;

const ChannelList: React.FC = () => {
  const categories = useAppSelector(state => state.channels.categories);
  const channels = useAppSelector(state => state.channels.items);

  return (
    <Container>
      <Header>
        Server Name
        <Settings size={20} />
      </Header>
      
      {categories.map(category => (
        <ChannelCategory
          key={category.id}
          name={category.name}
          collapsed={false}
        >
          {channels
            .filter(channel => channel.categoryId === category.id)
            .map(channel => (
              <ChannelItem
                key={channel.id}
                name={channel.name}
                icon={channel.type === 'text' ? <Hash /> : <Volume2 />}
                to={`/channels/${channel.serverId}/${channel.id}`}
              />
            ))}
        </ChannelCategory>
      ))}
    </Container>
  );
};

export default ChannelList;