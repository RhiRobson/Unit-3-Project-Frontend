import { useContext } from 'react';
import { Routes, Route } from 'react-router';

import NavBar from './components/NavBar/NavBar';
import SignUpForm from './components/SignUpForm/SignUpForm';
import SignInForm from './components/SignInForm/SignInForm';
import Landing from './components/Landing/Landing';
import Motivation from './components/Motivation/Motivation';

import { UserContext } from './contexts/UserContext';

const App = () => {
  const { user } = useContext(UserContext);

  return (
    <>
    <NavBar />
    <Routes>
      <Route path='/' element={user ? <Motivation /> : <Landing /> } />
      <Route path='/sign-up' element={<SignUpForm />} />
      <Route path='/sign-in' element={<SignInForm />} />
    </Routes>
    </>
  );
};

export default App;
