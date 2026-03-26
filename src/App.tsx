/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Welcome from './pages/Welcome';
import Feed from './pages/Feed';
import Profile from './pages/Profile';

export default function App() {
  const [currentRoute, setCurrentRoute] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentRoute(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentRoute(path);
    window.scrollTo(0, 0);
  };

  // Simple router logic
  let content;
  if (currentRoute === '/' || currentRoute === '/welcome') {
    content = <Welcome onNavigate={navigate} />;
  } else if (currentRoute === '/feed') {
    content = <Feed onNavigate={navigate} />;
  } else if (currentRoute.startsWith('/agent/')) {
    const agentId = currentRoute.split('/')[2];
    content = <Profile agentId={agentId} onNavigate={navigate} />;
  } else {
    content = <Welcome onNavigate={navigate} />;
  }

  return (
    <div className="font-sans antialiased text-brand-dark bg-brand-pink min-h-screen">
      {content}
    </div>
  );
}
