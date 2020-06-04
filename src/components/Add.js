import React, { useState } from 'react';
import { Modal, Button } from 'antd';

// To do : Turn this class into hook and pass props for the modal content
const Add = (props) => {
  const [isOpen, setIsOpen] = useState({
    ModalText: 'Content of the modal',
    visible: false,
    confirmLoading: false
  });

  const showModal = () => {
    setIsOpen({
      visible: true
    });
  };

  const handleOk = () => {
    setIsOpen({
      ModalText: 'The modal will be closed after two seconds',
      confirmLoading: true
    });
    setTimeout(() => {
      setIsOpen({
        visible: false,
        confirmLoading: false
      });
    }, 2000);
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setIsOpen({
      visible: false
    });
  };

  const { visible, confirmLoading, ModalText } = isOpen;

  return (
    <div>
      <Button type='primary' onClick={showModal}>
        Open Modal with async logic
      </Button>
      <Modal
        title='Title'
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>{ModalText}</p>
      </Modal>
    </div>
  );
};

export default Add;
