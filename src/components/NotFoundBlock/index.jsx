import React from 'react';
import styles from './NotFoundBlock.module.scss';

console.log(styles);

function NotFoundBlock() {
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
}

export default NotFoundBlock;
