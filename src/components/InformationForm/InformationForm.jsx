import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import styles from './InformationForm.module.css'

import * as goalService from '../../services/goalService';

const InformationForm = (props) => {

  const [formData, setFormData] = useState({ text: '' });
  const { goalId, informationId } = useParams();
  const navigate = useNavigate();


  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (goalId && informationId) {
      goalService.updateInformation(goalId, commentId, formData);
      navigate(`/goals/${goalId}`);
    } else {
      props.handleAddInformation(formData);
    }
    setFormData({ text: '' });
  };

  useEffect(() => {
    const fetchGoal = async () => {
      const goalData = await goalService.show(goalId);
      setFormData(goalData.information.find((information) => information._id === informationId));
    };
    if (goalId && informationId) fetchGoal();
  }, [goalId, informationId]);


  if (goalId && informationId) return (
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

