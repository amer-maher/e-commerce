import React from 'react';
import './Hero.css';
// Use external image link for hero
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  return (
    <section className="hero py-5 ">
      <div className="container">
        <div className="row align-items-center">
          {/* Left Side - Text Content */}
          <div className="col-md-6 text-center text-md-start mb-4 mb-md-0">
            <h1 className="display-5 fw-bold mb-3">Shop the Latest Deals</h1>
            <p className="lead text-muted mb-4">
              Discover quality products at unbeatable prices. Free shipping on orders over $50.
            </p>

            {/* Category Badges */}
            <div className="d-flex flex-wrap gap-2 mb-4 justify-content-center justify-content-md-start">
              <span className="badge bg-secondary">Electronics</span>
              <span className="badge bg-secondary">Fashion</span>
              <span className="badge bg-secondary">Home</span>
              <span className="badge bg-secondary">Sports</span>
            </div>

            {/* Buttons */}
            <div className="d-flex flex-wrap gap-3 justify-content-center justify-content-md-start">
              <Link to="/products" className="btn btn-lg btn-primary">
                Browse Products
              </Link>
            </div>
          </div>

          {/* Right Side - Image */}
          <div className="col-md-6 text-center">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPDN4mLxgj0SEnMi5S-nLDNkBgQ-OVtCygEw&s"
              className="img-fluid rounded shadow"
              alt="E-commerce promotion"
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
