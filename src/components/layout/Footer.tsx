import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-dark text-light mt-auto py-4">
      <Container>
        <Row>
          <Col md={4} className="mb-3 mb-md-0">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><Link to="/" className="text-light text-decoration-none">Home</Link></li>
              <li><Link to="/products" className="text-light text-decoration-none">Products</Link></li>
              <li><Link to="/cart" className="text-light text-decoration-none">Cart</Link></li>
            </ul>
          </Col>
          <Col md={4} className="mb-3 mb-md-0">
            <h5>Customer Service</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="text-light text-decoration-none">Contact Us</a></li>
              <li><a href="#" className="text-light text-decoration-none">Shipping Policy</a></li>
              <li><a href="#" className="text-light text-decoration-none">Returns & Exchanges</a></li>
            </ul>
          </Col>
          <Col md={4}>
            <h5>Connect With Us</h5>
            <div className="d-flex gap-3 fs-4">
              <a href="#" className="text-light"><i className="bi bi-facebook"></i></a>
              <a href="#" className="text-light"><i className="bi bi-twitter"></i></a>
              <a href="#" className="text-light"><i className="bi bi-instagram"></i></a>
            </div>
          </Col>
        </Row>
        <hr className="my-4" />
        <div className="text-center">
          <small>© {currentYear} E-Commerce Demo. All rights reserved.</small>
        </div>
      </Container>
    </footer>
  )
}

export default Footer
