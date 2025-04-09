import { useState, useEffect } from 'react';
import styles from './InformationForm.module.css'

const InformationForm = (props) => {
  const [formData, setFormData] = useState({ text: '' });

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    props.handleAddInformation(formData);
    setFormData({ text: '' });
  };


  return (
  
    <main className={styles.container}>
    <form onSubmit={handleSubmit}>
      <label htmlFor='text-input'>Goal Updates - add as much information as you can, stay accountable!</label>
      <textarea
        required
        type='text'
        name='text'
        id='text-input'
        value={formData.text}
        onChange={handleChange}
      />
      <button type='submit'>Update your progress!</button>
    </form>
    </main>
  );
};

export default InformationForm;

