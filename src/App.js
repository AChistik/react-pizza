import '../src/scss/app.scss';
import Header from './components/Header';
import CategoryList from './components/CategoryList';
import SortList from './components/SortList';
import MenuList from './components/MenuList';

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <CategoryList />
            <SortList />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <MenuList />
        </div>
      </div>
    </div>
  );
}

export default App;
