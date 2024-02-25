export async function fetchShopProducts() {
  const response = await fetch('http://localhost:3000/meals');
  const resData = await response.json();

  if (!response.ok) {
    throw new Error('Fetching  products failed!');
  }

  return resData;
}

export async function updateOrders(order) {
  const response = await fetch('http://localhost:3000/orders', {
    method: 'POST',
    body: JSON.stringify({ order }),
    headers: { 'Content-Type': 'application/json' },
  });

  const resData = await response.JSON();

  if (!response.ok) {
    throw new Error('Failed to update order data!');
  }

  return resData.message;
}
