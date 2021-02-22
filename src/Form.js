import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const Form = ({ createData }) => {
  const [value, setValue] = useState('');

  const handleChange = (e) => {
    setValue(e.currentTarget.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    createData({
      text: value,
      isChecked: false,
    }).then(() => {
      setValue('');
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField value={value} onChange={handleChange} />
      <Button type="submit">Add</Button>
    </form>
  );
};

export default Form;
