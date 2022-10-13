import About from './about/about';
import Cart from './cart/cart';
import Item from './item/item';
import Main from './main/main';
import Layout from './layout/layout';
import NotFound from './not-found/mot-found';
import { Routes, Route } from 'react-router-dom';
import {APP_ROUTE} from '../const/app-route';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<Main />}></Route>
          <Route path={`${APP_ROUTE.ITEM}/:id`} element={<Item />}></Route>
          <Route path={APP_ROUTE.CART} element={<Cart />}></Route>
          <Route path={APP_ROUTE.ABOUT} element={<About />}></Route>
        </Route>
        <Route path='*' element={<NotFound />}></Route>
      </Routes>
    </>
  );
}

export default App;
