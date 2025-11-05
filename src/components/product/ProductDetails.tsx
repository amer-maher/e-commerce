import React from 'react';

type Product = {
  id: string;
  name: string;
  price: number;
  description?: string;
  rating?: number;
  image?: string;
};

const ProductDetails: React.FC<{ product: Product; onAddToCart: () => void }> = ({
  product,
  onAddToCart,
}) => {
  return (
    <section className="container py-5">
      <div className="row align-items-center">
        <div className="col-md-6 mb-4 mb-md-0">
          <img
            src={product.image || 'https://via.placeholder.com/600x400?text=Product+Image'}
            alt={product.name}
            className="img-fluid rounded shadow-sm"
          />
        </div>
        <div className="col-md-6">
          <h2 className="fw-bold mb-3">{product.name}</h2>
          <p className="text-muted mb-3">{product.description}</p>
          <h4 className="text-dark mb-4">${product.price.toFixed(2)}</h4>
          <button className="btn custom-btn btn-lg" onClick={onAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
