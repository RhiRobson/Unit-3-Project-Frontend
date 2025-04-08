import { useContext, useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router';
import { UserContext } from './contexts/UserContext';

import NavBar from './components/NavBar/NavBar';
import SignUpForm from './components/SignUpForm/SignUpForm';
import SignInForm from './components/SignInForm/SignInForm';
import Landing from './components/Landing/Landing';
import Motivation from './components/Motivation/Motivation';
import GoalList from './components/GoalList/GoalList';
import GoalDetails from './components/GoalDetails/GoalDetails';
import GoalForm from './components/GoalForm/GoalForm';
import * as goalService from './services/goalService';


const App = () => {

  const { user } = useContext(UserContext);
  const [goals, setGoals] = useState([]);
  const navigate = useNavigate();

  const handleDeleteGoal = async (goalId) => {
    const deletedGoal = await goalService.deleteGoal(goalId);
    setGoals(goals.filter((goal) => goal._id !== goalId));
    navigate('/goals');
  };

  const handleAddGoal = async (goalFormData) => {
    const newGoal = await goalService.create(goalFormData);
    setGoals([newGoal, ...goals]);
    navigate('/goals');
  };

  useEffect(() => {
    const fetchAllGoals = async () => {
      const goalsData = await goalService.index();
      setGoals(goalsData);
    };
    if (user) fetchAllGoals();
  }, [user]);

  return (
    <>
    <NavBar />
    <Routes>
      <Route path='/' element={user ? <Motivation /> : <Landing /> } />
      {user ? (
          <>
            <Route path='/goals' element={<GoalList goals={goals}/>} />
            <Route path='/goals/:goalId' element={<GoalDetails />} />
            <Route path='/goals/new' 
                   element={<GoalForm handleAddGoal={handleAddGoal} />}/>
            <Route 
    path='/goals/:goalId'
    element={<GoalDetails handleDeleteGoal={handleDeleteGoal} />}
/>
          </>
        ) : (
          <>
            <Route path='/sign-up' element={<SignUpForm />} />
            <Route path='/sign-in' element={<SignInForm />} />
          </>
        )}
      </Routes>
    </>
  );
};

export default App;
