// Footer.tsx
import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="row row-cols-sm-2 row-cols-md-5  border-top bg-beige">
      {/* Brand / Logo */}
      <div className="col">
        <a
          href="/"
          className="d-flex align-items-center mb-3 link-body-emphasis text-decoration-none"
          aria-label="MyCompany"
        >
          <svg className="bi me-2" width="40" height="32" aria-hidden="true">
            <use xlinkHref="#bootstrap" />
          </svg>
        </a>
        <p className="text-body-secondary">© 2025 MyCompany</p>
      </div>

      {/* Empty column for spacing */}
      <div className="col mb-3"></div>

      {/* Section 1 */}
      <div className="col mb-3">
        <h5>Section 1</h5>
        <ul className="nav flex-column">
          <li className="nav-item mb-2">
            <a href="#" className="nav-link p-0 text-body-secondary">
              Home
            </a>
          </li>
          <li className="nav-item mb-2">
            <a href="#" className="nav-link p-0 text-body-secondary">
              Features
            </a>
          </li>
          <li className="nav-item mb-2">
            <a href="#" className="nav-link p-0 text-body-secondary">
              Pricing
            </a>
          </li>
          <li className="nav-item mb-2">
            <a href="#" className="nav-link p-0 text-body-secondary">
              FAQs
            </a>
          </li>
          <li className="nav-item mb-2">
            <a href="#" className="nav-link p-0 text-body-secondary">
              About
            </a>
          </li>
        </ul>
      </div>

      {/* Section 2 */}
      <div className="col mb-3">
        <h5>Section 2</h5>
        <ul className="nav flex-column">
          <li className="nav-item mb-2">
            <a href="#" className="nav-link p-0 text-body-secondary">
              Home
            </a>
          </li>
          <li className="nav-item mb-2">
            <a href="#" className="nav-link p-0 text-body-secondary">
              Features
            </a>
          </li>
          <li className="nav-item mb-2">
            <a href="#" className="nav-link p-0 text-body-secondary">
              Pricing
            </a>
          </li>
          <li className="nav-item mb-2">
            <a href="#" className="nav-link p-0 text-body-secondary">
              FAQs
            </a>
          </li>
          <li className="nav-item mb-2">
            <a href="#" className="nav-link p-0 text-body-secondary">
              About
            </a>
          </li>
        </ul>
      </div>

      {/* Section 3 */}
      <div className="col mb-3">
        <h5>Section 3</h5>
        <ul className="nav flex-column">
          <li className="nav-item mb-2">
            <a href="#" className="nav-link p-0 text-body-secondary">
              Home
            </a>
          </li>
          <li className="nav-item mb-2">
            <a href="#" className="nav-link p-0 text-body-secondary">
              Features
            </a>
          </li>
          <li className="nav-item mb-2">
            <a href="#" className="nav-link p-0 text-body-secondary">
              Pricing
            </a>
          </li>
          <li className="nav-item mb-2">
            <a href="#" className="nav-link p-0 text-body-secondary">
              FAQs
            </a>
          </li>
          <li className="nav-item mb-2">
            <a href="#" className="nav-link p-0 text-body-secondary">
              About
            </a>
          </li>
        </ul>
      </div>
      
    </footer>
  );
};

export default Footer;
