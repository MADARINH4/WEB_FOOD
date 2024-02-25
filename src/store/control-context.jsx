import { createContext, useState } from 'react';
import { useFetch } from '../hooks/useFetch';
import { fetchShopProducts } from '../http';

export const ControlContext = createContext({
  items: [],
  addItemToCart: () => {},
  updateItemQuantity: () => {},
  clearCart: () => {},
});

export default function ControlContextProvider({ children }) {
  const {
    isFetching,
    error,
    fetchedData: products,
  } = useFetch(fetchShopProducts, []);
  const [control, setControl] = useState({
    items: [],
  });

  function handleAddICartItem(id) {
    const updatedItems = [...control.items];

    const existingCartItemIndex = updatedItems.findIndex(
      (cartItem) => cartItem.id === id
    );
    const existingCartItem = updatedItems[existingCartItemIndex];

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity + 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      const product = products.find((product) => product.id === id);
      updatedItems.push({
        id: id,
        name: product.name,
        price: product.price,
        quantity: 1,
      });
    }

    setControl((prevItems) => {
      return { ...prevItems, items: updatedItems };
    });
  }

  function handleUpdateCartItemQuantity(productId, amount) {
    const updatedItems = [...control.items];

    const updatedItemIndex = updatedItems.findIndex(
      (cartItem) => cartItem.id === productId
    );
    const updatedItem = { ...updatedItems[updatedItemIndex] };

    updatedItem.quantity += amount;

    if (updatedItem.quantity <= 0) {
      updatedItems.splice(updatedItemIndex, 1);
    } else {
      updatedItems[updatedItemIndex] = updatedItem;
    }

    setControl((prevItems) => {
      return { ...prevItems, items: updatedItems };
    });
  }

  function handleClearItems() {
    setControl((prevItems) => {
      return {
        ...prevItems,
        items: [],
      };
    });
  }
  const ctxValue = {
    items: control.items,
    addItemToCart: handleAddICartItem,
    updateItemQuantity: handleUpdateCartItemQuantity,
    clearCart: handleClearItems,
  };

  return (
    <ControlContext.Provider value={ctxValue}>
      {children}
    </ControlContext.Provider>
  );
}
