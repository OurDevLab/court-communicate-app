import React from 'react';
import { Form, Button, Modal } from 'antd';

const DeleteCassationForm = ({ onConfirm, onCancel }) => {
  const handleDelete = () => {
    Modal.confirm({
      title: 'Czy na pewno chcesz usunąć skargę?',
      content: 'Tej operacji nie można cofnąć.',
      okText: 'Tak, usuń',
      cancelText: 'Anuluj',
      onOk: onConfirm,
      onCancel: onCancel,
    });
  };

  return (
    <Form layout="vertical">
      <Form.Item>
        <Button type="danger" style={{ width: '100%' }} onClick={handleDelete}>
          Usuń Skargę
        </Button>
      </Form.Item>
    </Form>
  );
};

export default DeleteCassationForm;
