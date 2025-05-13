import React, { useState, useEffect } from 'react';
import { Table, Button, Switch, Space } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { User } from '../types';
import { getUsers, deleteUser } from '../services/userService';
import { useAdminMode } from '../context/AdminModeContext';
import UserFormModal from './UserFormModal';

const UserTable: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const { isAdminMode } = useAdminMode();

  useEffect(() => {
    setUsers(getUsers());
  }, []);

  const handleDelete = (id: number) => {
    deleteUser(id);
    setUsers(getUsers());
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setEditingUser(null);
    setIsModalVisible(false);
    setUsers(getUsers());
  };

  return (
    <>
      <Button type="primary" onClick={() => setIsModalVisible(true)} style={{ marginBottom: 16 }}>
        Додати користувача
      </Button>
      <Table dataSource={users} rowKey="id">
        <Table.Column title="Ім'я" dataIndex="name" key="name" />
        <Table.Column title="Email" dataIndex="email" key="email" />
        <Table.Column title="Роль" dataIndex="role" key="role" />
        <Table.Column
          title="Активний"
          dataIndex="isActive"
          key="isActive"
          render={(isActive: boolean) => <Switch checked={isActive} disabled />}
        />
        <Table.Column
          title="Дії"
          key="actions"
          render={(_, record: User) => (
            <Space size="middle">
              <Button
                icon={<EditOutlined />}
                onClick={() => handleEdit(record)}
                disabled={!isAdminMode}
              />
              <Button
                icon={<DeleteOutlined />}
                onClick={() => handleDelete(record.id)}
                disabled={!isAdminMode}
              />
            </Space>
          )}
        />
      </Table>
      <UserFormModal
        visible={isModalVisible}
        onClose={handleModalClose}
        editingUser={editingUser}
      />
    </>
  );
};

export default UserTable;