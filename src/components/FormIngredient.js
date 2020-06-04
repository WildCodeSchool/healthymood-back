import React from 'react';
import 'antd/dist/antd.css';

import { Form, Input, Button, Checkbox } from 'antd';

const FormItem = Form.Item;

const FormIngredient = () => {
  return (
    <div>
      <Form className='form-ingredient' style={{ width: '250px', margin: 'auto' }}>
        <h1>Ajouter un Ingredient</h1>
        <FormItem label='Ingredient'>
          <Input
            type='text'
            placeholder="Nom de l'ingrédient"
          />
        </FormItem>
        <FormItem>
          <Checkbox>Potentiellement allergène</Checkbox>
        </FormItem>
        <FormItem>
          <Button type='primary' size='default'> Ajouter un Ingredient</Button>
        </FormItem>
      </Form>
    </div>
  );
};

export default FormIngredient;
