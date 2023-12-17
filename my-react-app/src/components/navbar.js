import React from "react";

function Navbar() {
  // Retrieve user information from localStorage
  const User = JSON.parse(localStorage.getItem("currentUser"));
  function LogOut() {
    localStorage.removeItem("currentUser");
    window.location.href = "/login";
  }
  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark"
      style={{ backgroundColor: "black" }}
    >
      <div className="container-fluid">
        <a className="navbar-brand" href="/home" style={{ color: "white" }}>
          The Bliss Adventures
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
          <span className="navbar-toggler-icon">
            <i class="fa-solid fa-bars"></i>
          </span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {User && User.user && User.user.name ? (
              <div class="dropdown">
                <button
                  class="btn btn-secondary dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{ backgroundColor: "black" }}
                >
                  <i class="fa-solid fa-user">{User.user.name}</i>
                </button>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                  <li>
                    <a class="dropdown-item" href="/profile">
                      Profile
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="#" onClick={LogOut}>
                      Log Out
                    </a>
                  </li>
                </ul>
              </div>
            ) : (
              <>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    href="http://localhost:3000/Register"
                    style={{ color: "white" }}
                  >
                    Register
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    href="http://localhost:3000/Login"
                    style={{ color: "white" }}
                  >
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
