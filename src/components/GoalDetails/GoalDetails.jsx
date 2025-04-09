import { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router';
import * as goalService from '../../services/goalService';
import CommentForm from '../CommentForm/CommentForm';
import InformationForm from '../InformationForm/InformationForm';
import { UserContext } from '../../contexts/UserContext';
import styles from './GoalDetails.module.css';

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

  const handleDeleteComment = async (commentId) => {
    const confirmDeleteComment = window.confirm("Are you sure you want to delete this comment?");
    if (confirmDeleteComment) {
      const deletedComment = await goalService.deleteComment(goalId, commentId);
      setGoal({
        ...goal,
        comments: goal.comments.filter((comment) => comment._id !== commentId),
      })
    };
  };

  const handleDeleteInformation = async (informationId) => {
    const confirmDeleteInformation = window.confirm("Are you sure you want to delete this update?");
    if (confirmDeleteInformation) {
      const deletedInformation = await goalService.deleteInformation(goalId, informationId);
      setGoal({
        ...goal,
        information: goal.information.filter((information) => information._id !== informationId),
      })
    };
  };

  if (!goal) return <main>Loading...</main>;
  return (
    <main className={styles.container}>
      <section>
        <header>
          <h1>{goal.title}</h1>
          <p>
            {`${goal.author.username} stared working towards this goal on
              ${new Date(goal.createdAt).toLocaleDateString('en-GB')}`}
          </p>

          <div>
            {goal.author._id === user._id && (
              <>
                <Link to={`/goals/${goalId}/edit`}><p>Edit</p></Link>
                <button onClick={() => props.handleDeleteGoal(goalId)}>Delete</button>
              </>
            )}
          </div>
        </header>
        <p>{goal.startingDetails}</p>
        <p>Work out how to show picture</p>
      </section>


      <section>
        <h2>Updates</h2>
        <InformationForm handleAddInformation={handleAddInformation} />
        {goal.information.length === 0 ? (
          <p>There are no updates.</p>
        ) : (
          goal.information.map((information) => (
            <article key={information._id}>
              <p>{information.text}</p>
              <header>
                <div>
                  <p>
                    Update posted on{" "}
                    {new Date(information.createdAt).toLocaleDateString("en-GB")}
                  </p>
                  <br />
                  <br />
                  {goal.author._id === user._id && (
                    <button onClick={() => handleDeleteInformation(information._id)}>
                      Delete
                    </button>
                  )}
                </div>
              </header>
            </article>
          ))
        )}
      </section>



      <section>
        <h2>Comments</h2>
        <CommentForm handleAddComment={handleAddComment} />
        {!goal.comments.length && <p>There are no comments.</p>}
        {goal.comments.map((comment) => (
          <article key={comment._id}>
            <header>
              <p>
                {`${comment.author.username} posted on
               ${new Date(comment.createdAt).toLocaleDateString('en-GB')}`}
              </p>

              {goal.author._id === comment.author._id && (
                <>
                  <Link to={`/goals/${goalId}/comments/${comment._id}/edit`}><p>Edit</p></Link>
                  <button onClick={() => handleDeleteComment(comment._id)}>Delete</button>
                </>
              )}
            </header>
            <p>{comment.text}</p>
          </article>
        ))}
      </section>
    </main>
  );
};

export default GoalDetails