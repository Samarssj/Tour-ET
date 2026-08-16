import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeContext";
import { CartContext } from "../../context/cartContex";
import { useAuthContext } from "../../customHook/useAuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, ShoppingBag, LogOut, User, Menu, X, MapPin } from "lucide-react";
import logo from "../../assets/lo.png";

const Header = () => {
  const history = useHistory();
  const { pathname } = useLocation();
  const { state: cartState, dispatch: cartDispatch } = useContext(CartContext);
  const { user, dispatch: authDispatch } = useAuthContext();
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    authDispatch({ type: "LOGOUT" });
    localStorage.removeItem("user");
    cartDispatch({ type: "SET", item: [] });
    history.push("/");
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Packages", path: "/package" },
    { name: "Ethiopia", path: "/Ethiopia" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className={`navbar navbar-expand-lg fixed-top ${isScrolled ? 'glass shadow-sm py-2' : 'py-3'}`}>
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <motion.img
            src={logo}
            alt="logo"
            className="rounded-circle me-2"
            style={{ height: "40px", width: "40px", objectFit: "cover" }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          />
          <span className="fw-bold fs-4">
            Tour<span className="text-primary">ET</span>
          </span>
        </Link>

        <button 
          className="navbar-toggler border-0 shadow-none" 
          type="button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div className={`collapse navbar-collapse ${isMobileMenuOpen ? 'show' : ''}`}>
          <ul className="navbar-nav mx-auto align-items-center">
            {navLinks.map((link) => (
              <li key={link.name} className="nav-item">
                <Link 
                  className={`nav-link ${pathname === link.path ? 'active text-primary' : ''}`} 
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          <div className="d-flex align-items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className="btn btn-link p-2 shadow-none border-0"
              style={{ color: 'var(--text-color)' }}
            >
              <AnimatePresence mode="wait">
                {isDarkMode ? (
                  <motion.div
                    key="sun"
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -10, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Sun size={20} className="text-warning" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -10, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Moon size={20} className="text-primary" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>

            {user && (
              <Link to="/cart" className="btn btn-link p-2 position-relative text-decoration-none" style={{ color: 'var(--text-color)' }}>
                <ShoppingBag size={20} />
                {cartState.length > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ fontSize: '0.6rem' }}>
                    {cartState.length}
                  </span>
                )}
              </Link>
            )}

            {!user ? (
              <Link className="btn btn-primary rounded-pill px-4" to="/login">
                Login
              </Link>
            ) : (
              <div className="d-flex align-items-center gap-2">
                <div className="d-flex flex-column align-items-end d-none d-lg-flex">
                  <span className="fw-bold small">{user.detail?.name || 'User'}</span>
                </div>
                <button 
                  className="btn btn-outline-primary rounded-pill px-3 py-1 d-flex align-items-center gap-2"
                  onClick={handleLogout}
                >
                  <LogOut size={16} />
                  <span className="small">Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
