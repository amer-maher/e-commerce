import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import ProductCard from '../components/product/ProductCard'
import useCart from '../hooks/useCart'

const Products: React.FC = () => {
  const { addItem } = useCart()
  
  // Sample products data - replace with API call later
  const products = [
    {
      id: '1',
      name: 'Product 1',
      price: 99.99,
      description: 'This is a sample product description.',
      rating: 4.5
    },
    {
      id: '2',
      name: 'Product 2',
      price: 149.99,
      description: 'Another great product with amazing features.',
      rating: 5
    },
    // Add more sample products as needed
  ]

  return (
    <Container className="py-4">
      <h2 className="mb-4">Our Products</h2>
      <Row xs={1} md={2} lg={3} className="g-4">
        {products.map(product => (
          <Col key={product.id}>
            <ProductCard
              product={product}
              onAddToCart={() => addItem({ ...product, quantity: 1 })}
            />
          </Col>
        ))}
      </Row>
    </Container>
  )
}

export default Products
