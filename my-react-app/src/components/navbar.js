import React from 'react';

function Navbar() {
  // Retrieve user information from localStorage
  const User = JSON.parse(localStorage.getItem('currentUser'));
  return (
    <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: 'black' }}>
      <div className="container-fluid">
        <a className="navbar-brand" href="#" style={{ color: 'white' }}>
          Second Monal
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
              {User && User.user && User.user.name ? (
                  <h1 style={{ color: 'white' }}>{User.user.name}</h1>
                ) : (
                  <>
                    <li className="nav-item">
                      <a className="nav-link" href="http://localhost:3000/Register" style={{ color: 'white' }}>
                        Register
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="http://localhost:3000/Login" style={{ color: 'white' }}>
                        Login
                      </a>
                    </li>
                  </>
                )}

          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
