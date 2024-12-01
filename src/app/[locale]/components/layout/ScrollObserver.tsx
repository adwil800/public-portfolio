import { useEffect, useRef, useState } from 'react';

export default function useScrollObserver () {
  const [isIntersecting, setIsIntersecting] = useState({ one: false, two: false });
  const refOne = useRef(null);
  const refTwo = useRef(null);

  useEffect(() => {
    const currentRefs = [refOne.current, refTwo.current];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === refOne.current) {
            setIsIntersecting((prev) => ({ ...prev, one: entry.isIntersecting }));
          } else if (entry.target === refTwo.current) {
            setIsIntersecting((prev) => ({ ...prev, two: entry.isIntersecting }));
          }
        });
      },
      { threshold: 0.1 }
    );

    currentRefs.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      currentRefs.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  return { refOne, refTwo, isIntersecting };
};
