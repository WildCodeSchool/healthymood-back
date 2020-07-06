import { useState } from 'react';
import produce from 'immer';

export default function useFormData(initialValues = {}) {
  const [fields, setFields] = useState(initialValues);
  const changeField = (key, value) => {
    setFields(produce(fields, draft => {
      draft[key] = value;
    }));
  };
  const handleFieldChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    changeField([name], value);
  };

  return {
    setFields,
    fields,
    changeField,
    handleFieldChange
  };
}
