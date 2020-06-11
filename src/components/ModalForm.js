import React, { useState } from 'react';
import { Modal, Button } from 'antd';

const ModalForm = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleOk = () => {
    setLoading({ loading: true });
    setTimeout(() => {
      setLoading({ loading: false });
      setIsOpen({ isOpen: false });
    }, 3000);
  };

  return (
    <div>
      <Button type='primary' onClick={() => setIsOpen(true)}>
        {props.title}
      </Button>
      <Modal
        title={props.title}
        visible={isOpen}
        onOk={() => handleOk}
        onCancel={() => setIsOpen(false)}
        footer={[
          <Button key='back' onClick={() => setIsOpen(false)}>
              Return
          </Button>,
          <Button key='submit' type='primary' loading={loading} onClick={() => handleOk}>
            Submit
          </Button>
        ]}
      >
        <props.component />

      </Modal>
    </div>
  );
};

export default ModalForm;
