import '../src/scss/app.scss';
import Header from './components/Header';
import Home from './pages/Home';
import { Routes, Route } from 'react-router-dom';
import NotFound from './pages/NotFound';
import Cart from './pages/Cart';
import { useState, createContext } from 'react';

export const SearchContext = createContext();

function App() {
  const [searchWord, setSearchWord] = useState('');

  return (
    <div className="wrapper">
      <SearchContext.Provider value={{ searchWord, setSearchWord }}>
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </SearchContext.Provider>
    </div>
  );
}

export default App;
