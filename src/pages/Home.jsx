import React from 'react';
import CategoryList from '../components/CategoryList';
import SortList from '../components/SortList';
import MenuList from '../components/MenuList';

function Home() {
  return (
    <>
      <div className="content__top">
        <CategoryList />
        <SortList />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <MenuList />
    </>
  );
}

export default Home;
