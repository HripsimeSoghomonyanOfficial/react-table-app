import React, { useState } from 'react';
import { validateForm } from '../../utils/validators';

interface RecordFormProps {
  addEntry: (entry: any) => void;
  dispatch: React.Dispatch<any>;
}

interface FormData {
  [key: string]: string;
  field1: string;
  field2: string;
  field3: string;
  field4: string;
  field5: string;
}

const RecordForm: React.FC<RecordFormProps> = ({ addEntry, dispatch }) => {
  const [formData, setFormData] = useState<FormData>({
    field1: '',
    field2: '',
    field3: '',
    field4: '',
    field5: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      dispatch({ type: 'SET_LOADING', payload: true });

      const response = await fetch('https://json-server.typicode.com/typicode/demo/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const entry = await response.json();
        addEntry(entry);
        setFormData({
          field1: '',
          field2: '',
          field3: '',
          field4: '',
          field5: '',
        });
      } else {
        const errorData = await response.json();
        setErrors({ api: errorData });
      }
    } catch (error) {
      setErrors({ api: 'Submission failed' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {Object.keys(formData).map((field) => (
        <div key={field}>
          <label>{field}</label>
          <input
            type="text"
            name={field}
            value={formData[field]}
            onChange={handleChange}
          />
          {errors[field] && <span>{errors[field]}</span>}
        </div>
      ))}
      <button type="submit">Submit</button>
      {errors.api && <span>{errors.api}</span>}
    </form>
  );
};

export default RecordForm;
