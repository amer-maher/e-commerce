import React from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const NotFound: React.FC = () => (
  <Container className="py-5">
    <Row className="justify-content-center text-center">
      <Col md={6}>
        <h1 className="display-1 text-muted mb-4">404</h1>
        <h2 className="mb-4">Page Not Found</h2>
        <p className="lead mb-4">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Button as={Link} to="/" variant="primary">
          Return Home
        </Button>
      </Col>
    </Row>
  </Container>
)

export default NotFound
