import { useEffect, useContext } from 'react';
import { Link } from 'react-router';

import * as userService from '../../services/userService';
import styles from '../GoalList/GoalList.module.css';

import { UserContext } from '../../contexts/UserContext';


const Motivation = (props) => {
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


  return (
    <main className={styles.container}>
      <h1>Welcome, {user.username}</h1>
      <br />
      <h3>
        This is your Motivational Wall where you can see all of your goals.
        <br />
        <br />
        Use the comments to help build the community and push yourself!
      </h3>
      {props.goals
        .filter(goal => goal.author._id === user._id)
        .map((goal) => (
          <Link key={goal._id} to={`/goals/${goal._id}`}>
            <article>
              <header>
                <h2>{goal.title}</h2>
                <p>
                  {`${goal.author.username} posted on ${new Date(goal.createdAt).toLocaleDateString()}`}
                </p>

                <p>{goal.startingDetails}</p>
                
                {goal.information.length > 0 ? (() => {
                  const latestUpdate = [...goal.information].sort(
                    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                  )[0];
                  return (
                    <div key={latestUpdate._id}>
                      <p>{latestUpdate.text}</p>
                      <p>
                        Update on{" "}
                        {new Date(latestUpdate.createdAt).toLocaleDateString("en-GB")}
                      </p>
                    </div>
                  );
                })() : (
                  <p>No Updates posted.</p>
                )}

                {goal.comments.length > 0 ? (() => {
                  const latestComment = [...goal.comments].sort(
                    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                  )[0];
                  return (
                    <div key={latestComment._id}>
                      <p>{latestComment.text}</p>
                      <p>
                        Comment on{" "}
                        {new Date(latestComment.createdAt).toLocaleDateString("en-GB")}
                      </p>
                    </div>
                  );
                })() : (
                  <p>No comments posted.</p>
                )}
              </header>
            </article>
          </Link>
        ))}
    </main>
  );
}

export default Motivation;

