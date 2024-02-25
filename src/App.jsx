import Cart from './components/Cart';
import Header from './components/Header';
import Shop from './components/Shop';
import UserProgressContextProvider from './store/progress-context';
import CartContextProvider from './store/control-context';
import Checkout from './components/Checkout';

function App() {
  return (
    <UserProgressContextProvider>
      <CartContextProvider>
        <Header />
        <Shop />
        <Cart />
        <Checkout />
      </CartContextProvider>
    </UserProgressContextProvider>
  );
}

export default App;
