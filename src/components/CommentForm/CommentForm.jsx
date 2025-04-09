import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';

import * as goalService from '../../services/goalService';

const CommentForm = (props) => {

  const [formData, setFormData] = useState({ text: '' });
  const { goalId, commentId } = useParams();
  const navigate = useNavigate();
  
  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (goalId && commentId) {
      goalService.updateComment(goalId, commentId, formData);
      navigate(`/goals/${goalId}`);
    } else {
      props.handleAddComment(formData);
    }
    setFormData({ text: '' });
  };


  useEffect(() => {
    const fetchGoal = async () => {
      const goalData = await goalService.show(goalId);
      setFormData(goalData.comments.find((comment) => comment._id === commentId));
    };
    if (goalId && commentId) fetchGoal();
  }, [goalId, commentId]);



  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor='text-input'>Your comment:</label>
      <textarea
        required
        type='text'
        name='text'
        id='text-input'
        value={formData.text}
        onChange={handleChange}
      />
      <button type='submit'>Send Motivation!</button>
    </form>
  );
};

export default CommentForm;

