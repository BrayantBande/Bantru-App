import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className="footer">
      <h4 className="text-center">Derechos Reservados &copy; BANTRUGBG</h4>
      <p className="text-center mt-3">
        <Link to="/about">About</Link>|<Link to="/contact">Contacto</Link>
      </p>
    </div>
  );
};

export default Footer;
