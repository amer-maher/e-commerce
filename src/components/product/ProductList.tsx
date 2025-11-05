import React from 'react';
import ProductCard from './ProductCard';
import useCart from '../../hooks/useCart';
import tshirtImg from '../../assets/images/T-shart.png';

const DEMO = [
  { id: '1', name: 'Product A', price: 19.99 , image:tshirtImg},
  { id: '2', name: 'Product B', price: 29.99,image:tshirtImg },
  { id: '3', name: 'Product C', price: 49.99,image:tshirtImg },
    { id: '1', name: 'Product A', price: 19.99 , image:tshirtImg},
  { id: '2', name: 'Product B', price: 29.99,image:tshirtImg },
  { id: '3', name: 'Product C', price: 49.99,image:tshirtImg },
    { id: '1', name: 'Product A', price: 19.99 , image:tshirtImg},
  { id: '2', name: 'Product B', price: 29.99,image:tshirtImg },
  { id: '3', name: 'Product C', price: 49.99,image:tshirtImg },
];

const ProductList: React.FC = () => {
  const { addItem } = useCart();

  return (
    <div className="container my-5">
      <h2 className="text-center fw-bold mb-4">Our Products</h2>
      <div className="row g-4">
        {DEMO.map((p) => (
          <div className="col-sm-6 col-md-4" key={p.id}>
            <ProductCard
              product={p}
              onAddToCart={() =>
                addItem({ id: p.id, name: p.name, price: p.price, quantity: 1 })
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
