import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Form, Input, Checkbox, Modal } from 'antd';

const FormItem = Form.Item;

const FormIngredient = () => {
  const [visible, setVisible] = useState(false);

  return (

    <div>
      <Form className='form-ingredient' style={{ width: '250px', margin: 'auto' }}>

        <Modal
          title='Ajouter un Ingredient'
          onCancel={() => setVisible(false)}
          onOk={() => setVisible(false)}
          visible={visible}
        >
          <FormItem label='Ingredient'>
            <Input
              type='text'
              placeholder="Nom de l'ingrédient"
            />
          </FormItem>
          <FormItem>
            <Checkbox>Potentiellement allergène</Checkbox>
          </FormItem>
        </Modal>

      </Form>
    </div>
  );
};

export default FormIngredient;
