import React, { useEffect, useState } from 'react';

export default ({ children }) => {
  const [hovered, setHovered] = useState(false);
  const setFalse = () => setHovered(false);
  const setTrue = () => setHovered(true);
  useEffect(() => {
    window.addEventListener('mouseleave', setFalse);
    return () => window.removeEventListener('mouseleave', setFalse);
  });
  return (
    <span onMouseOver={setTrue} onMouseOut={setFalse}>
      {children(hovered)}
    </span>
  );
}