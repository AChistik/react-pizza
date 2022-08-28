import React from 'react';
import styles from './NotFoundBlock.module.scss';

const NotFoundBlock: React.FC = () => {
  return (
    <>
      <h1 className={styles.root}>
        <span>&#129320;</span> <br /> Ничего не найдено :(
        <p className={styles.description}>
          К сожалению данная страница отсутствует в нашем магазине
        </p>
      </h1>
    </>
  );
};

export default NotFoundBlock;
