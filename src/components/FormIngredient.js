import React from 'react';
import 'antd/dist/antd.css';
import { Form, Input, Space, Button, Checkbox } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'

const FormIngredient = () => {
  const onFinish = values => {
    console.log('Received values of form:', values);
  };

  return (
    <Form name="dynamic_form_nest_item" onFinish={onFinish} autoComplete="off">
        <Form.List name="ingredients">
        {(fields, { add, remove }) => {
          return (
            <div>
              {fields.map(field => (
                <Space key={field.key} style={{ display: 'flex', marginBottom: 8 }} align="start">
                  <Form.Item
                    {...field}
                    name={[field.name, 'ingredient']}
                    fieldKey={[field.fieldKey, 'ingredient-name']}
                    rules={[{ required: true, message: 'Missing ingredient name' }]}
                  >
                  <Input placeholder="First Name" />
                  </Form.Item>
                  <Form.Item
                    {...field}
                    fieldKey={[field.fieldKey, 'allergen']}
                  >
                    <Checkbox>Allergène</Checkbox>
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
                  type="dashed"
                  onClick={() => {
                    add();
                  }}
                  block
                >
                  <PlusOutlined /> Add field
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
