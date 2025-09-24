import { useState } from 'react';
import LandingPage from './components/landing/LandingPage';
import Dashboard from './components/dashboard/Dashboard';

function App() {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  const handleGetStarted = () => {
    setUser({ name: 'Guest User', email: 'guest@example.com' });
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div className="App">
      {user ? (
        <Dashboard user={user} onLogout={handleLogout} />
      ) : (
        <LandingPage onGetStarted={handleGetStarted} />
      )}
    </div>
  );
}

export default App;
