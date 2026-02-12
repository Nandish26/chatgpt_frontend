import React from 'react';

const Footer = () => {
  const footerStyle = {
    color: '#8e8e8e', // Subtle grey text color
    fontSize: '14px',
    textAlign: 'center',
    padding: '20px',
    fontFamily: 'sans-serif'
  };

  const linkStyle = {
    color: '#007bff', // The blue color for links
    fontWeight: 'bold',
    textDecoration: 'none',
    cursor: 'pointer'
  };

  return (
    <footer style={footerStyle}>
      By messaging ChatGPT, you agree to our 
      <a href="/terms" style={linkStyle}> Terms </a> 
      and have read our 
      <a href="/privacy" style={linkStyle}> Privacy Policy</a>.
    </footer>
  );
};

export default Footer;