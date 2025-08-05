import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './MobileMenu.css';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const [shouldRender, setShouldRender] = useState(isOpen);

  useEffect(() => {
    if (isOpen) setShouldRender(true);
  }, [isOpen]);

  const handleAnimationEnd = () => {
    if (!isOpen) setShouldRender(false);
  };

  return shouldRender ? (
    <div
      className={`mobile-menu ${isOpen ? 'slide-in' : 'slide-out'}`}
      onAnimationEnd={handleAnimationEnd}
    >
      <button className="close-button" onClick={onClose}>✕</button>
      <Link to="/" onClick={onClose}>Home</Link>
      <Link to="/ratings" onClick={onClose}>My Ratings</Link>
      <Link to="/profile" onClick={onClose}>Profile</Link>
    </div>
  ) : null;
};

export default MobileMenu;
