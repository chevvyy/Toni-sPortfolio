import React, { useState, useEffect } from 'react';
import { debounce } from 'helpers';

const Navbar = () => {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  const handleScroll = debounce(() => {
    const currentScrollPos = window.pageYOffset;

    setVisible((prevScrollPos > currentScrollPos && prevScrollPos - currentScrollPos > 70) || currentScrollPos < 10);

    setPrevScrollPos(currentScrollPos);
  }, 100);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);

  }, [prevScrollPos, visible, handleScroll]);

  const navbarStyles = {
    style: 'display: grid; grid-template-columns: repeat(3, 1fr); grid-gap: 5%; padding-top: 2%; padding-bottom: 2%; padding-left: 20px; padding-right: 20px;',
    position: 'fixed',
    transition: 'top 0.6s'
  }

  return (
    <div style={{ ...navbarStyles, top: visible ? '0' : '-60px' }}>
      Some Company Inc.
    </div>
  );
};

export default Navbar;
