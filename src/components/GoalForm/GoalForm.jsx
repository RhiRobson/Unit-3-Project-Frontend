import { useState } from 'react';

const GoalForm = (props) => {
  const [formData, setFormData] = useState({
    title: '',
    startingDetails: '',
    picture: '',
  });

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    props.handleAddGoal(formData);
  };

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <label htmlFor='title-input'>Give your goal a name, stay accountable.</label>
        <input
          required
          type='text'
          name='title'
          id='title-input'
          value={formData.title}
          onChange={handleChange}
        />
        <label htmlFor='startingDetails-input'>Give some starting information about your goal e.g. what do you want to achive? Where are you now? What is your timescale?</label>
        <textarea
          required
          type='text'
          name='startingDetails'
          id='startingDetails-input'
          value={formData.startingDetails}
          onChange={handleChange}
        />
        <label htmlFor='picture-input'>Upload a picture if you wish, it can help you to progress with your goal.</label>
        <input
          type='text'
          name='picture'
          id='picture-input'
          value={formData.picture}
          onChange={handleChange}
          />
        <button type='submit'>SUBMIT</button>
      </form>
    </main>
  );
};

export default GoalForm;
