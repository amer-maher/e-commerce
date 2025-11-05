import React from 'react';
import { Link } from 'react-router-dom';

type Product = {
  id: string;
  name: string;
  price: number;
  rating?: number;
  image?: string;
};

const ProductCard: React.FC<{ product: Product; onAddToCart: () => void }> = ({
  product,
  onAddToCart,
}) => {
  return (
    <div className="card product-card shadow-sm h-100">
      <div className="product-image bg-light d-flex align-items-center justify-content-center">
        <img
          src={product.image || 'https://via.placeholder.com/300x200?text=Product'}
          alt={product.name}
          className="img-fluid rounded"
        />
      </div>
      <div className="card-body text-center">
        <h5 className="card-title fw-bold mb-2">
          <Link to={`/products/${product.id}`} className="text-decoration-none text-dark">
            {product.name}
          </Link>
        </h5>
        <p className="card-text text-muted mb-3">${product.price.toFixed(2)}</p>
        <button className="btn custom-btn" onClick={onAddToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
