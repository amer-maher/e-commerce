import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, Row, Col, Card, Button, ListGroup } from 'react-bootstrap'
import useCart from '../hooks/useCart'

const Cart: React.FC = () => {
  const { items, total, removeItem, clearCart } = useCart()
  const navigate = useNavigate()

  return (
    <Container className="py-4">
      <h2 className="mb-4">Your Cart</h2>
      {items.length === 0 ? (
        <Card body>
          <p className="text-center mb-4">Your cart is empty.</p>
          <div className="text-center">
            <Button variant="primary" onClick={() => navigate('/products')}>
              Browse Products
            </Button>
          </div>
        </Card>
      ) : (
        <Row>
          <Col md={8}>
            <Card>
              <ListGroup variant="flush">
                {items.map((item) => (
                  <ListGroup.Item key={item.id}>
                    <Row className="align-items-center">
                      <Col xs={3} md={2}>
                        {item.image && (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="img-fluid rounded"
                          />
                        )}
                      </Col>
                      <Col xs={6} md={7}>
                        <h5>{item.name}</h5>
                        <p className="text-muted mb-0">
                          ${item.price.toFixed(2)} x {item.quantity}
                        </p>
                      </Col>
                      <Col xs={3} md={3} className="text-end">
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => removeItem(item.id)}
                        >
                          Remove
                        </Button>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card>
          </Col>
          <Col md={4}>
            <Card>
              <Card.Header>
                <h4 className="mb-0">Order Summary</h4>
              </Card.Header>
              <Card.Body>
                <div className="d-flex justify-content-between mb-3">
                  <span>Total Items:</span>
                  <span>{items.length}</span>
                </div>
                <div className="d-flex justify-content-between mb-4">
                  <span className="h5">Total:</span>
                  <span className="h5">${total.toFixed(2)}</span>
                </div>
                <div className="d-grid gap-2">
                  <Button variant="primary" onClick={() => navigate('/checkout')}>
                    Proceed to Checkout
                  </Button>
                  <Button variant="outline-secondary" onClick={clearCart}>
                    Clear Cart
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  )
}

export default Cart
