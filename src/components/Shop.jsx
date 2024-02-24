import ProductCard from './ProductCard';
import testImg from '../../backend/public/images/beef-tacos.jpg';
import { useFetch } from '../hooks/useFetch';
import { fetchShopProducts } from '../http';

export default function Shop() {
  const {
    isFetching,
    error,
    fetchedData: products,
    setFetchedData: setProducts,
  } = useFetch(fetchShopProducts, []);

  return (
    <section className="shop">
      <ul id="shop">
        {products.map((product) => (
          <li key={product.id}>
            <ProductCard
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
