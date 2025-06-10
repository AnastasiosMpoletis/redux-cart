import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';

function App() {
  const showCart = useSelector(state => state.ui.cartIsVisible);
  const cart = useSelector(state => state.cart);

  /**
   * We use Google FireBase database.
   * Asynchronous functionality should NOT get executed in a reducer. 
   * It can be executed in this useEffect with cart as a selector and useEffect dependency.
   * This way, whenever the store changes the cart, fetch will update the database.
   */
  useEffect(() => {
    fetch('https://redux-cart-ed864-default-rtdb.europe-west1.firebasedatabase.app/cart.json',
      {
        method: 'PUT', // overwites the entirely json data
        body: JSON.stringify(cart)
      }
    );
  }, [cart]);

  return (
    <Layout>
      {showCart && <Cart />}
      <Products />
    </Layout>
  );
}

export default App;
