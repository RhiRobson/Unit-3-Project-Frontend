import { Link } from 'react-router';

const GoalList = (props) => {
    return <main>
      <h2>My Working Goals</h2>
      {props.goals.map((goal) => (
        <Link key={goal._id} to={`/goals/${goal._id}`}>
          <article>
            <header>
              <h2>{goal.title}</h2>
              <p>
                {`${goal.author.username} posted on
                ${new Date(goal.createdAt).toLocaleDateString()}`}
              </p>
            </header>
            <p>{goal.text}</p>
          </article>
        </Link>
      ))}
    </main>
  };
  
  export default GoalList;