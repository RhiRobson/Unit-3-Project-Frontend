import { useContext, useState, useEffect } from 'react';
import { Routes, Route } from 'react-router';

import NavBar from './components/NavBar/NavBar';
import SignUpForm from './components/SignUpForm/SignUpForm';
import SignInForm from './components/SignInForm/SignInForm';
import Landing from './components/Landing/Landing';
import Motivation from './components/Motivation/Motivation';
import GoalList from './components/GoalList/GoalList';

import * as goalService from './services/goalService';

import { UserContext } from './contexts/UserContext';

const App = () => {
  const { user } = useContext(UserContext);

  const [goals, setGoals] = useState([]);

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
