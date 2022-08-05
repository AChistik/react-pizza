import '../src/scss/app.scss';
import Header from './components/Header';
import Home from './pages/Home';
import { Routes, Route } from 'react-router-dom';
import NotFound from './pages/NotFound';
import Cart from './pages/Cart';

import { useState } from 'react';

function App() {
  const [searchWord, setSearchWord] = useState('');
  function onChangeSearchWord(word) {
    setSearchWord(word);
  }
  return (
    <div className="wrapper">
      <Header searchWord={searchWord} onChangeSearchWord={onChangeSearchWord} />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home searchWord={searchWord} />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
