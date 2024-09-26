import React, { useState } from 'react';

interface FormData {
  field1: string;
  field2: string;
  field3: string;
  field4: string;
  field5: string;
}

const RecordForm: React.FC<{ addEntry: (entry: FormData) => void }> = ({ addEntry }) => {
  const [formData, setFormData] = useState<FormData>({
    field1: '',
    field2: '',
    field3: '',
    field4: '',
    field5: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name as keyof FormData]: value,
    }));
  };

  const validateForm = () => {
    const newErrors: { [key in keyof FormData]?: string } = {};
    (Object.keys(formData) as Array<keyof FormData>).forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = 'This field is required';
      }
    });
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      addEntry(formData);
      setFormData({
        field1: '',
        field2: '',
        field3: '',
        field4: '',
        field5: '',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {Object.keys(formData).map((field) => (
        <div key={field}>
          <input
            name={field}
            placeholder={field}
            value={formData[field as keyof FormData]}
            onChange={handleChange}
          />
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
};

export default RecordForm;
