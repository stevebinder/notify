import { useEffect, useState } from 'react';

export default onMount => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    if (!isMounted) {
      setIsMounted(true);
      onMount();
    }
  });
  return isMounted;
};