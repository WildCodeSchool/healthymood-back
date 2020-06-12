import React from 'react';
import 'antd/dist/antd.css';
import { Form, Input, Checkbox, Button } from 'antd';

const FormIngredient = () => {

  const onFinish = values => {
    console.log('Received values of form:', values);
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      name='form'
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete='off'
    >
      <div>
        <Form.Item
          name='ingredient'
          rules={[{ required: true, message: 'Veuillez entrer un nom' }]}
        >
          <Input placeholder="Nom de l'ingrédient" required />
        </Form.Item>
        <Form.Item name='is_allergen' valuePropName='checked' noStyle>
          <Checkbox>Allergène</Checkbox>
        </Form.Item>
        <Form.Item>
          <Button htmlType='submit'>Enregistrer</Button>
        </Form.Item>
      </div>
    </Form>
  );
};

export default FormIngredient;
