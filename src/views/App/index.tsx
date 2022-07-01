import React from 'react';
import styles from './index.module.scss';

type Props = {};

export const App: React.FC = (props: Props) => {
  return (
    <article className={styles.article}>
      <h1 className={styles.articleTitle}>To Do App</h1>
      <section className={styles.articleSection}></section>
      <section className={styles.articleSection}></section>
    </article>
  );
};
