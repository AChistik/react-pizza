import React from 'react';
import CategoryList from '../components/CategoryList';
import SortList from '../components/SortList';
import MenuList from '../components/MenuList';

function Home() {
  return (
    <div class="container">
      <div className="content__top">
        <CategoryList />
        <SortList />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <MenuList />
    </div>
  );
}

export default Home;
