import { useContext } from 'react';
import { ControlContext } from '../store/control-context';
import Modal from './Modal';
import { UserProgressContext } from '../store/progress-context';

export default function Cart() {
  const { items, updateItemQuantity } = useContext(ControlContext);
  const { progress, hideModalCart, showModalCheckout } =
    useContext(UserProgressContext);
  const totalPrice = items.reduce(
    (accumulator, item) => accumulator + item.quantity * item.price,
    0
  );
  const formattedTotalPrice = `$${totalPrice.toFixed(2)}`;

  function handleCloseCart() {
    hideModalCart();
  }
  function handleGotCheckout() {
    showModalCheckout();
  }

  let buttonActions = (
    <button onClick={handleCloseCart} className="text-button">
      Close
    </button>
  );

  if (items.length > 0) {
    buttonActions = (
      <>
        <button onClick={handleCloseCart} className="text-button">
          Close
        </button>
        <button onClick={handleGotCheckout} className="button">
          Checkout
        </button>
      </>
    );
  }

  return (
    <Modal
      className=""
      open={progress === 'cart'}
      onClose={progress === 'cart' ? handleCloseCart : null}
    >
      <h2>'Your Shopping Cart'</h2>
      <div className="cart">
        {items.length === 0 && <p>No items in cart!</p>}
        {items.length > 0 && (
          <ul>
            {items.map((item) => {
              return (
                <li className="cart-item" key={item.id}>
                  <p>
                    <span>
                      {item.name} - {item.quantity}x
                    </span>
                    <span> ${item.price}</span>
                  </p>
                  <p className="cart-item-actions">
                    <button onClick={() => updateItemQuantity(item.id, -1)}>
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateItemQuantity(item.id, 1)}>
                      +
                    </button>
                  </p>
                </li>
              );
            })}
          </ul>
        )}
        <p className="cart-total">
          <strong>{formattedTotalPrice}</strong>
        </p>
        <p className="modal-actions">{buttonActions}</p>
      </div>
    </Modal>
  );
}
