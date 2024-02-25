import { useContext } from 'react';
import logoImg from '../assets/logo.jpg';
import { UserProgressContext } from '../store/progress-context';
import { ControlContext } from '../store/control-context';

export default function Header() {
  const { showModalCart } = useContext(UserProgressContext);
  const { items } = useContext(ControlContext);

  const formattedTotalQuantity = items.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  function handleShowCart() {
    showModalCart();
  }

  return (
    <header id="main-header">
      <div id="title">
        <img src={logoImg} alt="Logo" />
        <h1>REACTFOOD</h1>
      </div>
      <button onClick={handleShowCart} className="button">
        Cart {`(${formattedTotalQuantity})`}
      </button>
    </header>
  );
}
