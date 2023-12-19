import React from 'react';
import { Link } from 'react-router-dom';
import './css/LandingPage.css';
import Logo from '../static-imgs/logo-final.png';

export default function LandingPage() {
  return (
    <div className='landing-page'>
      <div className="glass-background container">
        <div className="content row align-items-center">
          <div className="col-md-6 image-container">
            <img src={Logo} alt="Background" className="img-fluid" />
          </div>
          <div className="col-md-6 text-container">
            <h2 className="display-4">Bliss Adventure Hotel</h2>
            <h1 className="h3"><em>There is only one boss, the GUEST!!</em></h1>
            <Link to="/loginScreen">
              <button className='btn btn-info'> Get Started </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
