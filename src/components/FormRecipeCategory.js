import React from 'react';
import 'antd/dist/antd.css';
import { Form, Input, Space, Button } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

const FormIngredient = () => {
  const onFinish = (values) => {
    console.log('Received values of form:', values);
  };

  return (
    <Form name='dynamic_form_nest_item' onFinish={onFinish} autoComplete='off'>
      <Form.List name='ingredients'>
        {(fields, { add, remove }) => {
          return (
            <div>
              {fields.map((field) => (
                <Space
                  key={field.key}
                  style={{ display: 'flex', marginBottom: 8 }}
                  align='start'
                >
                  <Form.Item
                    {...field}
                    name={[field.name, 'name']}
                    fieldKey={[field.fieldKey, 'categoryRecipeName']}
                    rules={[
                      { required: true, message: 'Missing category name' }
                    ]}
                  >
                    <Input placeholder='Name' />
                  </Form.Item>

                  <MinusCircleOutlined
                    onClick={() => {
                      remove(field.name);
                    }}
                  />
                </Space>
              ))}

              <Form.Item>
                <Button
                  type='dashed'
                  onClick={() => {
                    add();
                  }}
                  block
                >
                  <PlusOutlined /> Ajouter une catégorie
                </Button>
              </Form.Item>
            </div>
          );
        }}
      </Form.List>
    </Form>
  );
};

export default FormIngredient;
