import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import FormRecipeCategory from './FormRecipeCategory';

// To do : Passer en props les formulaires
const ModalRecipesCategories = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Button type='primary' onClick={() => setIsOpen(true)}>
        Ajouter une catégorie
      </Button>
      <Modal
        title='Ajouter une catégorie'
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
        <FormRecipeCategory />
      </Modal>
    </div>
  );
};

export default ModalRecipesCategories;
