import React, { useState } from 'react';
import styled from 'styled-components';
import { ChevronRight } from 'lucide-react';

interface CategoryProps {
  name: string;
  collapsed?: boolean;
  children: React.ReactNode;
}

const Container = styled.div`
  margin-top: ${({ theme }) => theme.spacing.md};
`;

const Header = styled.div`
  padding: 0 ${({ theme }) => theme.spacing.md};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  color: ${({ theme }) => theme.colors.text.muted};
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;

const Content = styled.div<{ isCollapsed: boolean }>`
  display: ${({ isCollapsed }) => isCollapsed ? 'none' : 'block'};
`;

const ChannelCategory: React.FC<CategoryProps> = ({
  name,
  collapsed = false,
  children
}) => {
  const [isCollapsed, setIsCollapsed] = useState(collapsed);

  return (
    <Container>
      <Header onClick={() => setIsCollapsed(!isCollapsed)}>
        <ChevronRight
          size={12}
          style={{
            transform: `rotate(${isCollapsed ? 0 : 90}deg)`,
            transition: 'transform 0.2s'
          }}
        />
        {name}
      </Header>
      <Content isCollapsed={isCollapsed}>
        {children}
      </Content>
    </Container>
  );
};

export default ChannelCategory;