import ProductCard from './ProductCard';
import useHttp from '../hooks/useHttp';
import Error from './Error';

const requestConfig = {};

export default function Shop() {
  const {
    data: products,
    isLoading,
    error,
  } = useHttp('http://localhost:3000/meals', requestConfig, []);

  if (isLoading) return <p className="center">Loading...</p>;

  if (error) {
    return <Error title="Failed to fetch meals" message={error} />;
  }

  return (
    <section className="shop">
      <ul id="shop">
        {products.map((product) => (
          <li key={product.id}>
            <ProductCard
              id={product.id}
              img={`http://localhost:3000/${product.image}`}
              title={product.name}
              price={product.price}
              description={product.description}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
