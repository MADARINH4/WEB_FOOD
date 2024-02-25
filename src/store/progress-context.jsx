import { createContext, useState } from 'react';

export const UserProgressContext = createContext({
  progress: '',
  showModalCart: () => {},
  hideModalCart: () => {},
  showModalCheckout: () => {},
  hideModalCheckout: () => {},
});

export default function UserProgressContextProvider({ children }) {
  const [userProgress, setUserProgress] = useState('');

  function handleShowCart() {
    setUserProgress('cart');
  }

  function handleShowCheckout() {
    setUserProgress('checkout');
  }

  function handleHideCart() {
    setUserProgress('');
  }

  function handleHideCheckout() {
    setUserProgress('');
  }

  const ctxValue = {
    progress: userProgress,
    showModalCart: handleShowCart,
    hideModalCart: handleHideCart,
    showModalCheckout: handleShowCheckout,
    hideModalCheckout: handleHideCheckout,
  };

  return (
    <UserProgressContext.Provider value={ctxValue}>
      {children}
    </UserProgressContext.Provider>
  );
}
