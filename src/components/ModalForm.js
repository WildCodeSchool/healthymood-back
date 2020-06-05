import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import FormIngredient from './FormIngredient'

// To do : Passer en props les formulaires
const ModalForm = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Button type='primary' onClick={() => setIsOpen(true)}>
        Ajouter un ingrédient
      </Button>
      <Modal
        title='Ajouter un ingrédient'
        visible={isOpen}
        onOk={() => setIsOpen(false)}
        onCancel={() => setIsOpen(false)}
        footer={[
          <Button key="back" onClick={() => setIsOpen(false)}>
            Annuler
          </Button>,
          <Button key="submit" type="primary" onClick={() => setIsOpen(false)}>
            Ajouter
          </Button>
        ]}
      >
        <FormIngredient />
      </Modal>
    </div>
  );
};

export default ModalForm;