import React from 'react';
import styled from 'styled-components';
import { Outlet } from 'react-router-dom';
import ServerList from './ServerList';
import ChannelSidebar from './ChannelSidebar';
import MemberSidebar from './MemberSidebar';

const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
`;

const Content = styled.div`
  display: flex;
  flex: 1;
`;

const MainContent = styled.main`
  flex: 1;
  background-color: #36393f;
  display: flex;
  flex-direction: column;
`;

const AppLayout: React.FC = () => {
  return (
    <Container>
      <ServerList />
      <Content>
        <ChannelSidebar />
        <MainContent>
          <Outlet />
        </MainContent>
        <MemberSidebar />
      </Content>
    </Container>
  );
};

export default AppLayout;