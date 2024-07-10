import { useState, useEffect } from 'react';
import { Client as Styletron } from 'styletron-engine-atomic';

export function useStyletronEngine() {
  const [engine, setEngine] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setEngine(new Styletron());
    }
  }, []);

  return engine;
}
