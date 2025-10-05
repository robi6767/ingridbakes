'use client';

import { useEffect } from 'react';

export default function CrispChat() {
  useEffect(() => {
    // Initialize Crisp only on the client side
    window.$crisp = [];
    window.CRISP_WEBSITE_ID = "c4dc44ea-90a4-4dea-b989-1befc2066555";

    // Load Crisp script
    const script = document.createElement('script');
    script.src = 'https://client.crisp.chat/l.js';
    script.async = true;

    document.head.appendChild(script);

    return () => {
      // Cleanup if needed
      try {
        delete window.$crisp;
        delete window.CRISP_WEBSITE_ID;
        document.head.removeChild(script);
      } catch (error) {
        console.error('Error cleaning up Crisp:', error);
      }
    };
  }, []);

  // No visible UI needed
  return null;
}