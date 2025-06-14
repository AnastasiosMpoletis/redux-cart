import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Fragment } from 'react';

import Notification from './components/UI/Notification.js';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { sendCartData, fetchCartData } from './store/cart-actions.js';

let isInitial = true; // we use it so that useEffect cannot send data when opening the App for the first time

function App() {
  const dispatch = useDispatch();
  const showCart = useSelector(state => state.ui.cartIsVisible);
  const cart = useSelector(state => state.cart);
  const notification = useSelector(state => state.ui.notification);

  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);

  /**
   * We use Google FireBase database.
   * Asynchronous functionality should NOT get executed in a reducer. 
   * It can be executed in this useEffect with cart as a selector and useEffect dependency.
   * This way, whenever the store changes the cart, fetch will update the database.
   */
  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }

    if (cart.changed) {
      dispatch(sendCartData(cart));
    }

  }, [cart, dispatch]);

  return (
    <Fragment>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
