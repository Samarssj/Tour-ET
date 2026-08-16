import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuthContext } from "../../customHook/useAuthContext";
import { motion } from "framer-motion";
import { UserPlus, User, Mail, Lock, AlertCircle } from "lucide-react";

const Register = () => {
  const history = useHistory();
  const { dispatch } = useAuthContext();
  const [fullInfo, setFullInfo] = useState({});
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFullInfo({ ...fullInfo, [name]: value });
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/user/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(fullInfo),
        }
      );
      const result = await response.json();
      if (!response.ok) {
        setError(result.msg || "Registration failed. Please try again.");
      } else {
        localStorage.setItem("user", JSON.stringify(result.data));
        dispatch({ type: "LOGIN", payload: result.data });
        history.push("/");
      }
    } catch (err) {
      setError("Network error. Please check your connection.");
    }
  };

  return (
    <section className="auth-section main-content-wrapper">
      <div className="container">
        <div className="row align-items-center justify-content-center">
          <motion.div 
            className="col-12 col-md-5"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="auth-card shadow-lg">
              <div className="text-center mb-5">
                <div className="bg-primary-subtle d-inline-block p-3 rounded-circle mb-3">
                  <UserPlus size={32} className="text-primary" />
                </div>
                <h2 className="fw-bold">Create Account</h2>
                <p className="text-muted">Join us and explore Ethiopia together</p>
              </div>

              {error && (
                <motion.div 
                  className="alert alert-danger d-flex align-items-center gap-2 py-2 px-3 mb-4 rounded-3"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <AlertCircle size={18} />
                  <span className="small">{error}</span>
                </motion.div>
              )}

              <form onSubmit={handelSubmit}>
                <div className="mb-4">
                  <label className="form-label small fw-bold text-uppercase text-muted">Full Name</label>
                  <div className="input-group">
                    <span className="input-group-text bg-transparent border-end-0">
                      <User size={18} className="text-muted" />
                    </span>
                    <input
                      className="form-control border-start-0 ps-0"
                      type="text"
                      placeholder="John Doe"
                      name="name"
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="form-label small fw-bold text-uppercase text-muted">Email Address</label>
                  <div className="input-group">
                    <span className="input-group-text bg-transparent border-end-0">
                      <Mail size={18} className="text-muted" />
                    </span>
                    <input
                      className="form-control border-start-0 ps-0"
                      type="email"
                      placeholder="name@example.com"
                      name="email"
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="mb-5">
                  <label className="form-label small fw-bold text-uppercase text-muted">Password</label>
                  <div className="input-group">
                    <span className="input-group-text bg-transparent border-end-0">
                      <Lock size={18} className="text-muted" />
                    </span>
                    <input
                      className="form-control border-start-0 ps-0"
                      type="password"
                      placeholder="••••••••"
                      name="password"
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <button type="submit" className="btn btn-primary w-100 py-3 mb-4">
                  Create Account
                </button>

                <p className="text-center text-muted small mb-0">
                  Already have an account?{" "}
                  <Link to="/login" className="text-primary fw-bold text-decoration-none">
                    Sign In
                  </Link>
                </p>
              </form>
            </div>
          </motion.div>

          <motion.div 
            className="col-12 col-md-6 d-none d-md-block text-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <img
              src="https://th.bing.com/th/id/R.3c2473019a11b804e25c80baa314a225?rik=O0%2bJgGBVjU7Kmw&pid=ImgRaw&r=0"
              className="img-fluid"
              style={{ maxWidth: '80%', filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.1))' }}
              alt="Register Illustration"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Register;
