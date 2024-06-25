import React from 'react';
import store from './store/store';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CartPage from './pages/CartPage';
import Profile from './components/Profile';

import './App.css';

import ProductList from './components/ProductList';
function App() {
  return (
    <Provider store={store}>

<Router>
      <Routes>
        <Route path="/"  Component={ProductList} />
        <Route path="/cart" Component={CartPage} />
        <Route path="/profile" Component={Profile} />
      </Routes>
    </Router>

    </Provider>
     
    
  );
}

export default App;
