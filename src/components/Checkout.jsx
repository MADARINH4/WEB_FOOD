import { useContext } from 'react';
import Modal from './Modal';
import { UserProgressContext } from '../store/progress-context';
import { ControlContext } from '../store/control-context';
import { updateOrders } from '../http';
import useHttp from '../hooks/useHttp';
import Error from './Error';

export default function Checkout() {
  const { progress, hideModalCheckout } = useContext(UserProgressContext);
  const { items, clearCart } = useContext(ControlContext);
  const {
    data,
    isLoading: isSending,
    error,
    sendRequest,
    clearData,
  } = useHttp('http://localhost:3000/orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  const formattedTotalPrice = items.reduce(
    (accumulator, item) => accumulator + item.quantity * item.price,
    0
  );

  async function handleSubmit(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const data = Object.fromEntries(fd.entries());

    sendRequest(
      JSON.stringify({
        order: { items: items, customer: data },
      })
    );
  }

  function handleCloseCheckout() {
    hideModalCheckout();
  }

  function finishedSubmit() {
    hideModalCheckout();
    clearCart();
    clearData();
  }

  let actions = (
    <>
      <button
        type="button"
        onClick={handleCloseCheckout}
        className="text-button"
      >
        Close
      </button>
      <button type="submit" className="button">
        Submit Order
      </button>
    </>
  );

  if (isSending) {
    actions = <span>Sending order data...</span>;
  }

  if (data && !error) {
    return (
      <Modal
        className=""
        open={progress === 'checkout'}
        onClose={handleCloseCheckout}
      >
        <h2>Success!</h2>
        <p>Your order was submitted successfully.</p>
        <p className="modal-actions">
          <button onClick={finishedSubmit} className="button">
            Okay
          </button>
        </p>
      </Modal>
    );
  }

  return (
    <Modal
      className=""
      open={progress === 'checkout'}
      onClose={handleCloseCheckout}
    >
      <form onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <p>Total Price: {formattedTotalPrice}</p>

        <div className="control">
          <label htmlFor="name">Full Name</label>
          <input id="name" type="text" name="name" required />
        </div>

        <div className="control">
          <label htmlFor="email">E-Mail Address</label>
          <input id="email" type="email" name="email" required />
        </div>

        <div className="control">
          <label htmlFor="street">Street</label>
          <input id="street" type="text" name="street" required />
        </div>

        <div className="control-row">
          <div className="control">
            <label htmlFor="postal-code">Postal Code</label>
            <input
              id="postal-code"
              type="text"
              name="postal-code"
              required
              minLength={8}
            />
          </div>

          <div className="control">
            <label htmlFor="city">City</label>
            <input id="city" type="text" name="city" required />
          </div>
        </div>
        {error && <Error title="Failed to submit order" message={error} />}
        <p className="modal-actions">{actions}</p>
      </form>
    </Modal>
  );
}
