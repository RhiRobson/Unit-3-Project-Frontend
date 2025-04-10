import { useEffect, useContext } from 'react';
import { Link } from 'react-router';
import CommentForm from '../CommentForm/CommentForm';
import InformationForm from '../InformationForm/InformationForm';
import styles from './GoalList.module.css';

import * as userService from '../../services/userService';

import { UserContext } from '../../contexts/UserContext';


const GoalList = (props) => {
  const { user } = useContext(UserContext);


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedUsers = await userService.index();
      } catch (err) {
        console.log(err)
      }
    }
    if (user) fetchUsers();
  }, [user]);


  return <main className={styles.container}>
    <h1>Welcome, {user.username}</h1>
    <br></br>
    <h3>
      This is your Motivational Wall where you can see all of your goals and the goals of other users.
      <br></br>
      <br></br>
      Use the comments to help build the community and push others to get their goals!
    </h3>
    {props.goals.map((goal) => (
      <Link key={goal._id} to={`/goals/${goal._id}`}>
        <article>
          <header>
            <h2>{goal.title}</h2>
            <p>
              {`${goal.author.username} posted on
                ${new Date(goal.createdAt).toLocaleDateString()}`}
            </p>
            <p>{goal.startingDetails}</p>
            <p>{goal.picture}</p>
          </header>
        </article>
      </Link>
    ))}
  </main>
};

export default GoalList;