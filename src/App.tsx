import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Login';
import Home from './Home';
import Navbar from './Navbar';
import Products from './Products';  // Tu componente CRUD

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState('');

  const validUser = {
    email: 'erianni6044@gmail.com',
    password: '123456',
    name: 'Administrator',
  };

  const handleLogin = (email: string, password: string) => {
    if (email === validUser.email && password === validUser.password) {
      setIsAuthenticated(true);
      setUserName(validUser.name);
    } else {
      alert('Invalid credentials');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserName('');
  };

  return (
    <Router>
      {isAuthenticated && <Navbar onLogout={handleLogout} userName={userName} />}
      <div className="content">
        <Routes>
          {!isAuthenticated ? (
            <Route path="/*" element={<Login onLogin={handleLogin} />} />
          ) : (
            <>
              <Route path="/" element={<Home userName={userName} />} />
              <Route path="/Products" element={<Products />} />
              <Route path="*" element={<Navigate to="/" />} />
            </>
          )}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
