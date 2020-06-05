import React from 'react';
import 'antd/dist/antd.css';
import { Form, Input, Checkbox } from 'antd';

const FormItem = Form.Item;

const FormIngredient = () => {
  return (
    <div>
      <Form className='form-ingredient' style={{ width: '250px', margin: 'auto' }}>
        <FormItem label='Ingredient'>
          <Input
            type='text'
            placeholder="Nom de l'ingrédient"
          />
        </FormItem>
        <FormItem>
          <Checkbox>Potentiellement allergène</Checkbox>
        </FormItem>
      </Form>
    </div>
  );
};

export default FormIngredient;
