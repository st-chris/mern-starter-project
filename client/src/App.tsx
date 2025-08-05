import { Route, Routes } from 'react-router-dom';
import './App.css';
import { useEffect, useRef, useState } from 'react';
import Navbar from './components/navbar/NavBar';
import MobileMenu from './components/mobile-menu/MobileMenu';
import Home from './pages/Home';
import Profile from './pages/Profile';
import { useDispatch } from 'react-redux';
import { logout, refreshLogin } from './reducers/auth';
import type { AppDispatch } from './types/redux';
import RegisterForm from './components/RegisterForm';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const hasRefreshed = useRef(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!hasRefreshed.current) {
      dispatch(refreshLogin())
        .unwrap()
        .catch(() => {
          dispatch(logout());
        });
        
      hasRefreshed.current = true;
    }
  }, [dispatch]);

  return (
      <div className="app">
        <div className="app-wrapper">
          <Navbar onMenuToggle={() => setMenuOpen(!menuOpen)} />
          <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              <Route path="/register" element={<RegisterForm />} />
            </Routes>
          </main>
           <footer className="footer">
      <p>© 2025 NAME. All rights reserved.</p>
    </footer>
        </div>
      </div>
  );
};

export default App;
