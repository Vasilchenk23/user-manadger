import React from 'react';
import { Layout, Button } from 'antd';
import UserTable from './components/UserTable';
import { useAdminMode } from './context/AdminModeContext';

const { Header, Content } = Layout;

const AppContent: React.FC = () => {
  const { isAdminMode, toggleAdminMode } = useAdminMode();

  return (
    <Layout>
      <Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ color: 'white' }}>Менеджер Користувачів</h1>
        <Button onClick={toggleAdminMode}>
          {isAdminMode ? 'Перемкнути в режим користувача' : 'Перемкнути в режим адміністратора'}
        </Button>
      </Header>
      <Content style={{ padding: '24px' }}>
        <UserTable />
      </Content>
    </Layout>
  );
};

export default AppContent;