
import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router';
import * as goalService from '../../services/goalService';
import CommentForm from '../CommentForm/CommentForm';
import InformationForm from '../InformationForm/InformationForm';
import { UserContext } from '../../contexts/UserContext';

const GoalDetails = (props) => {
    const { goalId } = useParams();
    const { user } = useContext(UserContext);
    const [goal, setGoal] = useState(null);


  useEffect(() => {
    const fetchGoal = async () => {
    const goalData = await goalService.show(goalId);
      setGoal(goalData);
    };
      fetchGoal();
    }, [goalId]
  );

  const handleAddComment = async (commentFormData) => {
    const newComment = await goalService.createComment(goalId, commentFormData);
    setGoal({ ...goal, comments: [...goal.comments, newComment] });
  };

  const handleAddInformation = async (informationFormData) => {
    const newInformation = await goalService.createInformation(goalId, informationFormData);
    setGoal({ ...goal, information: [...goal.information, newInformation] });
  };
  
  if (!goal) return <main>Loading...</main>;

    return ( 
        <main>
        <section>
          <header>
            <h1>{goal.title}</h1>
            <p>
              {`${goal.author.username} stared working towards this goal on
              ${new Date(goal.createdAt).toLocaleDateString('en-GB')}`}
            </p>
            {goal.author._id === user._id && (
              <>
                <button onClick={() => props.handleDeleteGoal(goalId)}>
              Delete</button>
              </>
            )}
          </header>

          <p>{goal.startingDetails}</p>

          <p>Work out how to show picture</p>
          
        </section>
        <section>
          <h2>Updates</h2>
          <InformationForm handleAddInformation={handleAddInformation}/>
                {!goal.information.length && <p>There are no updates.</p>}
                {goal.information.map((information) => (
                <article key={information._id}>
                    <header>
                        <p>
                          "Update posted on {new Date(information.createdAt).toLocaleDateString('en-GB')}`
                        </p>
                    </header>
                     <p>{information.text}</p>
                </article>
             ))}
        </section>
        <section>
        <h2>Comments</h2>
        <CommentForm handleAddComment={handleAddComment}/>
            {!goal.comments.length && <p>There are no comments.</p>}
            {goal.comments.map((comment) => (
             <article key={comment._id}>
                <header>
                    <p>
                     {`${comment.author.username} posted on
                     ${new Date(comment.createdAt).toLocaleDateString('en-GB')}`}
                    </p>
                </header>
                <p>{comment.text}</p>
            </article>
        ))}
      </section>
      </main>
  );
};

  export default GoalDetails
  