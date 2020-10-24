import React from 'react';
// locals
import Navbar from './Navbar';
import Footer from './Footer';

// eslint-disable-next-line react/prop-types
export default function Layout({ children }) {
  return (
    <div>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
