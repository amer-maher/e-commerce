import React from 'react';
import ProductList from '../components/product/ProductList';

const ProductsPage: React.FC = () => {
  return (
    <main className="container">
      <h2 className="page-title">Products</h2>
      <ProductList />
    </main>
  );
};

export default ProductsPage;
