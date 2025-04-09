const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/goals`;

const index = async () => {
    try {
      const res = await fetch(BASE_URL, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      return res.json();
    } catch (error) {
      console.log(error);
    }
  };

  const show = async (goalId) => {
    try {
      const res = await fetch(`${BASE_URL}/${goalId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      return res.json();
    } catch (error) {
      console.log(error);
    }
  };
  
  const create = async (goalFormData) => {
    try {
      const res = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(goalFormData),
      });
      return res.json();
    } catch (error) {
      console.log(error);
    }
  };

  const createComment = async (goalId, commentFormData) => {
    try {
      const res = await fetch(`${BASE_URL}/${goalId}/comments`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(commentFormData),
      });
      return res.json();
    } catch (error) {
      console.log(error);
    }
  };
  
  const createInformation = async (goalId, informationFormData) => {
    try {
      const res = await fetch(`${BASE_URL}/${goalId}/information`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(informationFormData),
      });
      return res.json();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteGoal = async (goalId) => {
    try {
      const res = await fetch(`${BASE_URL}/${goalId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return res.json();
    } catch (error) {
      console.log(error);
    }
  };

  async function updateGoal(goalId, goalFormData) {
    try {
      const res = await fetch(`${BASE_URL}/${goalId}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(goalFormData),
      });
      return res.json();
    } catch (error) {
      console.log(error);
    }
  }

  const deleteComment = async (goalId, commentId) => {
    try {
      const res = await fetch(`${BASE_URL}/${goalId}/comments/${commentId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });
      return res.json();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteInformation = async (goalId, informationId) => {
    try {
      const res = await fetch(`${BASE_URL}/${goalId}/information/${informationId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });
      return res.json();
    } catch (error) {
      console.log(error);
    }
  };


  export { 
    index,
    show,
    create,
    createComment,
    createInformation,
    deleteGoal,
    updateGoal,
    deleteComment,
    deleteInformation,
  };

