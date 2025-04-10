import { useContext } from 'react';
import { Link } from 'react-router';
import styles from './NavBar.module.css';
import Star from '../../../images/star.png';


import { UserContext } from '../../contexts/UserContext';

const NavBar = () => {
  const { user, setUser } = useContext(UserContext);

  const handleSignOut = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <nav className={styles.container}>
      <Link to='/'><img src={Star} alt='Star' /></Link>
      {user ? (
        <ul>
          <li>{user.username}</li>
          <li><Link to='/'>My Motivation</Link></li>
          <li><Link to='/goals'>View All Goals</Link></li>
          <li><Link to='/goals/new'>New Goal</Link></li>
          <li><Link to='/' onClick={handleSignOut}>Sign Out</Link></li>
        </ul>
      ) : (
        <ul>
          <li><Link to='/sign-in'>Sign In</Link></li>
          <li><Link to='/sign-up'>Sign Up</Link></li>
        </ul>
      )}
    </nav>
  );
}

export default NavBar;