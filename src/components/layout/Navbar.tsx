import React from 'react'
import { Navbar as BsNavbar, Nav, Container } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import useCart from '../../hooks/useCart'

const Navbar: React.FC = () => {
  const { user, logout } = useAuth()
  const { items } = useCart()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <BsNavbar bg="dark" variant="dark" expand="lg" className="mb-3">
      <Container>
        <BsNavbar.Brand as={Link} to="/">E-Commerce</BsNavbar.Brand>
        <BsNavbar.Toggle aria-controls="navbar-nav" />
        <BsNavbar.Collapse id="navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/products">Products</Nav.Link>
          </Nav>
          <Nav>
            {user ? (
              <>
                <Nav.Link as={Link} to="/cart">
                  Cart ({items.length})
                </Nav.Link>
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                <Nav.Link as={Link} to="/register">Register</Nav.Link>
              </>
            )}
          </Nav>
        </BsNavbar.Collapse>
      </Container>
    </BsNavbar>
  )

export default Navbar


