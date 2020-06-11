import React from 'react';
import 'antd/dist/antd.css';
import { Form, Input, Checkbox, Button } from 'antd';

const FormIngredient = () => {
  const onFinish = values => {
    console.log('Received values of form:', values);
  };

  return (
    <Form
      name='form'
      onFinish={onFinish}
      autoComplete='off'
    >
      <div>
        <Form.Item
          name='ingredient'
          rules={[{ required: true, message: 'Veuillez entrer un nom' }]}
        >
          <Input placeholder="Nom de l'ingrédient" required />
        </Form.Item>
        <Form.Item name='is_allergen' valuePropName='checked'>
          <Checkbox defaultChecked={false}>Allergène</Checkbox>
        </Form.Item>
        <Form.Item>
          <Button htmlType='submit'>Enregistrer</Button>
        </Form.Item>
      </div>
    </Form>
  );
};

export default FormIngredient;
