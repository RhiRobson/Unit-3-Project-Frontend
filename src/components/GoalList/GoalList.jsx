import { useEffect, useContext } from 'react';
import { Link } from 'react-router';
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
    <div>
    <h1>Welcome, {user.username}</h1>
    <h3>
      Here’s where your goals, and the goals of others, come to life. Celebrate wins, spark motivation, and lift each other up through your comments.
      <br />
      Don’t just dream it, get it!
    </h3>
    </div>
    {props.goals.map((goal) => (
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
</main>;
}

export default GoalList;