import React, { useEffect } from 'react';
import { Modal, Form, Input, Select, Checkbox } from 'antd';
import { User } from '../types';
import { addUser, updateUser } from '../services/userService';

interface Props {
  visible: boolean;
  onClose: () => void;
  editingUser: User | null;
}

const UserFormModal: React.FC<Props> = ({ visible, onClose, editingUser }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (editingUser) {
      form.setFieldsValue(editingUser);
    } else {
      form.resetFields();
    }
  }, [editingUser, form]);

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        const user: User = {
          id: editingUser ? editingUser.id : Date.now(),
          ...values,
        };
        if (editingUser) {
          updateUser(user);
        } else {
          addUser(user);
        }
        onClose();
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };

  return (
    <Modal
      open={visible}
      title={editingUser ? 'Редагувати користувача' : 'Додати користувача'}
      onCancel={onClose}
      onOk={handleOk}
      okText="Зберегти"
      cancelText="Скасувати"
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="name"
          label="Ім'я"
          rules={[{ required: true, message: 'Будь ласка, введіть ім\'я' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: 'Будь ласка, введіть email' },
            { type: 'email', message: 'Невірний формат email' },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="role"
          label="Роль"
          rules={[{ required: true, message: 'Будь ласка, виберіть роль' }]}
        >
          <Select>
            <Select.Option value="Admin">Admin</Select.Option>
            <Select.Option value="User">User</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name="isActive" valuePropName="checked">
          <Checkbox>Активний</Checkbox>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UserFormModal;