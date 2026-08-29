import React from 'react';
import { Container } from '../components/Container';
import styles from './Work.module.css';

interface Project {
  id: string;
  number: string;
  title: string;
  category: string;
  year: string;
  image: string;
  link: string;
}

const projects: Project[] = [
  {
    id: '1',
    number: '01',
    title: 'Interactive Web Platform',
    category: 'Web Design / Development',
    year: '2026',
    image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&q=80',
    link: '#',
  },
  {
    id: '2',
    number: '02',
    title: 'Mobile App Interface',
    category: 'UI / UX Design',
    year: '2025',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80',
    link: '#',
  },
  {
    id: '3',
    number: '03',
    title: 'Brand Identity System',
    category: 'Design / Strategy',
    year: '2025',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80',
    link: '#',
  },
];

export const Work: React.FC = () => {
  return (
    <section id="work" className={styles.work}>
      <Container maxWidth="xl">
        <div className={styles.header}>
          <h2>SELECTED WORK</h2>
        </div>

        <div className={styles.projectGrid}>
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`${styles.projectCard} ${
                index === 0 ? styles.featured : ''
              }`}
            >
              <div className={styles.imageWrapper}>
                <img src={project.image} alt={project.title} />
              </div>
              <div className={styles.projectInfo}>
                <span className={styles.number}>{project.number}</span>
                <h3>{project.title}</h3>
                <p className={styles.category}>{project.category}</p>
                <div className={styles.meta}>
                  <span>{project.year}</span>
                  <a href={project.link} className={styles.link}>
                    ↗
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.breakSection}>
          <h2>
            DESIGNING<br />
            THROUGH<br />
            <span className={styles.serif}>Code.</span>
          </h2>
        </div>
      </Container>
    </section>
  );
};
