export default function ProductCard({ img, title, price, description }) {
  return (
    <div className="product-card">
      <img src={img} alt="productImg" />
      <div>
        <div>
          <h3>{title}</h3>
          <p className="product-card-price">${price}</p>
          <p>{description}</p>
        </div>
        <p className="product-card-actions">
          <button>Add To Cart</button>
        </p>
      </div>
    </div>
  );
}
