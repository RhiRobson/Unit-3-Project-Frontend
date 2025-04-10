import styles from './Landing.module.css';
import NoBackground from '../../../images/NoBackground.png';

const Landing = () => {
  return (
    <>
      <main className={styles.container}>
        <section className={styles.splash}>
          <img src={NoBackground} alt='Go Getters Logo' />
        </section>

        <section className={styles.about}>
          <header>
            <h3>Don't Dream it, Get it!</h3>
            <h1>Go Getters!</h1>
          </header>
          <article>
            <p>
            Crush your fitness goals and cheer others on with Go Getters — the ultimate motivational fitness tracker. Set your targets, track your progress, and stay inspired with real-time support from a like-minded community. Whether you're running your first mile or training for the Hyrox, Go Getters keeps you accountable and fired up. Comment, connect, and conquer — because goals are better when we get them together.
            </p>
          </article>
        </section>

        <section className={styles.testimonial}>
          <header>
            <h3>Who's Getting it?</h3>
            <h1>TESTIMONIALS</h1>
          </header>
          <article>
            <header>
              <h4>Ben Manley</h4>
              <p>Teacher - training to swim the English Channel</p>
            </header>
            <p>
            “Go Getters completely changed the way I approach my fitness journey. Setting goals is easy, but staying motivated was always the hard part — until now. Seeing others push through their challenges and getting encouraging comments on my own progress keeps me going every day. It’s like having a gym buddy in your pocket!”
            </p>
            <footer>
            </footer>
          </article>
        </section>
      </main>

      <footer className={styles.footer}>
        Go Getters - DON'T DREAM IT, GET IT!
      </footer>
    </>
  );
};

export default Landing;