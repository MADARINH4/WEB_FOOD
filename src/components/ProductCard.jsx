import { useContext } from 'react';
import { ControlContext } from '../store/control-context';

export default function ProductCard({ id, img, title, price, description }) {
  const { addItemToCart } = useContext(ControlContext);

  return (
    <>
      <div className="product-card">
        <img src={img} alt="productImg" />
        <div>
          <h3>{title}</h3>
          <p className="product-card-price">${price}</p>
          <p>{description}</p>
        </div>
        <p className="product-card-actions">
          <span>
            <button onClick={() => addItemToCart(id)}>Add To Cart</button>
          </span>
        </p>
      </div>
    </>
  );
}
