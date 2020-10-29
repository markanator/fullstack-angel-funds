import React from 'react';
// locals
import Navbar from './Navbar';

// eslint-disable-next-line react/prop-types
export default function CreateLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
