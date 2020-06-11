import React, { useState } from 'react';
import { Modal, Button } from 'antd';

function ModalForm(props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Button type='primary' onClick={() => setIsOpen(true)}>
        {props.btnTitle}
      </Button>
      <Modal
        title={props.title}
        visible={isOpen}
        onOk={() => setIsOpen(false)}
        onCancel={() => setIsOpen(false)}
        footer={[
          <Button key='back' onClick={() => setIsOpen(false)}>
            Annuler
          </Button>,
          <Button key='submit' type='primary' onClick={() => setIsOpen(false)}>
            Ajouter
          </Button>
        ]}
      >
        {props.component}
      </Modal>
    </div>
  );
};

export default ModalForm;
