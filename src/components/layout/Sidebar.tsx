import React from 'react';

const Sidebar: React.FC = () => {
  return (
    <>
      {/* Cart Button */}
      <button
        className="btn btn-outline-warning btn-sm"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#cartSidebar"
        aria-controls="cartSidebar"
      >
        🛒 Cart
      </button>

      {/* Offcanvas Sidebar */}
      <div
        className="offcanvas offcanvas-end text-bg-dark"
        tabIndex={-1}
        id="cartSidebar"
        aria-labelledby="cartSidebarLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="cartSidebarLabel">Your Cart</h5>
          <button
            type="button"
            className="btn-close btn-close-white"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
       
      </div>
    </>
  );
};

export default Sidebar;
