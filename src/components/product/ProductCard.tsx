import React from 'react'
import { Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { RatingStars } from '../common/RatingStars'

type Product = {
  id: string
  name: string
  price: number
  rating?: number
  image?: string
  description?: string
}

const ProductCard: React.FC<{ product: Product; onAddToCart: () => void }> = ({ product, onAddToCart }) => {
  return (
    <Card className="h-100">
      {product.image && (
        <Card.Img
          variant="top"
          src={product.image}
          alt={product.name}
          style={{ height: '200px', objectFit: 'cover' }}
        />
      )}
      <Card.Body className="d-flex flex-column">
        <Card.Title>
          <Link to={`/products/${product.id}`} className="text-decoration-none text-dark">
            {product.name}
          </Link>
        </Card.Title>
        {product.description && (
          <Card.Text className="text-muted">
            {product.description.length > 100
              ? `${product.description.substring(0, 97)}...`
              : product.description}
          </Card.Text>
        )}
        <div className="mt-auto">
          {product.rating !== undefined && (
            <div className="mb-2">
              <RatingStars rating={product.rating} />
            </div>
          )}
          <div className="d-flex justify-content-between align-items-center">
            <span className="h5 mb-0">${product.price.toFixed(2)}</span>
            <Button variant="primary" onClick={onAddToCart}>
              Add to Cart
            </Button>
          </div>
        </div>
      </Card.Body>
    </Card>
  )
}

export default ProductCard


