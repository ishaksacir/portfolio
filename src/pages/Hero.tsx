import React from 'react';
import { Container } from '../components/Container';
import { Button } from '../components/Button';
import styles from './Hero.module.css';

export const Hero: React.FC = () => {
  return (
    <section className={styles.hero}>
      <Container maxWidth="xl">
        <div className={styles.content}>
          <div className={styles.headline}>
            <h1>
              BUILDING<br />
              DIGITAL<br />
              EXPERIENCES.
            </h1>
          </div>

          <div className={styles.intro}>
            <p>
              Frontend developer focused on building distinctive digital experiences through design,
              interaction and code.
            </p>
          </div>

          <div className={styles.cta}>
            <Button variant="primary" size="lg">
              VIEW MY WORK →
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
};
