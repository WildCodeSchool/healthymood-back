import { useState } from 'react';

export default function useFormData (initialValues = {}) {
  const [fields, setFields] = useState(initialValues);
  const changeField = (name, value) => {
    setFields({ ...fields, [name]: value });
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
    handleFieldChange
  };
}
