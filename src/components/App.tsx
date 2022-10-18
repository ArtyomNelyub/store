import About from './about/about';
import Cart from './cart/cart';
import ItemPage from './item-page/item-page';
import Main from './main/main';
import Layout from './layout/layout';
import NotFound from './not-found/not-found';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { AppRoute } from '../const/app-route';
import React from 'react';

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Main />}></Route>
          <Route path={`${AppRoute.ITEM}/:id`} element={<ItemPage />}></Route>
          <Route path={AppRoute.CART} element={<Cart />}></Route>
          <Route path={AppRoute.ABOUT} element={<About />}></Route>
        </Route>
        <Route path='*' element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
