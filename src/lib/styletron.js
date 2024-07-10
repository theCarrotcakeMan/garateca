import { Client as StyletronClient, Server as StyletronServer } from 'styletron-engine-atomic';
import { useMemo } from 'react';

let styletron;

export function getStyletron() {
  if (typeof window === 'undefined') {
    // On the server, create a new instance for each request
    return new StyletronServer();
  }

  // On the client, reuse the same instance
  if (!styletron) {
    styletron = new StyletronClient();
  }

  return styletron;
}

export function useStyletron() {
  return useMemo(() => getStyletron(), []);
}
