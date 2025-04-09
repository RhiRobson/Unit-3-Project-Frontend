import { useEffect, useContext } from 'react';
import * as userService from '../../services/userService';

import { UserContext } from '../../contexts/UserContext';

const Motivation = () => {
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedUsers = await userService.index();
        console.log(fetchedUsers);
      } catch (err) {
        //console.log(err)
      }
    }
    if (user) fetchUsers();
  }, [user]);

  return (
    <main>
      <h1>Welcome, {user.username}</h1>
      <p>
        This is your Motivational Wall where you can see your motivational posts and comments.
      </p>
    </main>
  );
};

export default Motivation;

