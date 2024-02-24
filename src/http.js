export async function fetchShopProducts() {
  const response = await fetch('http://localhost:3000/meals');
  const resData = await response.json();

  if (!response.ok) {
    throw new Error('Fetching  products failed!');
  }

  return resData;
}
