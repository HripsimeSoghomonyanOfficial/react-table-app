export const validateForm = (data: any) => {
    const errors: any = {};
    for (const key in data) {
      if (!data[key]) {
        errors[key] = 'This field is required';
      }
    }
    return errors;
  };
  