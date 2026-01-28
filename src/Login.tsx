import "./assets/Login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

const Login = () => {
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }

    try {
      setLoading(true);
      await signIn(email, password);
      navigate("/", { replace: true });
    } catch (err: any) {
      setError(err.message ?? "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-header">
        <h1>Login Page</h1>
        <p>Designed with Adobe XD</p>
      </div>

      <div className="login-card">
        <div className="login-left">
          <h2 className="logo">Logo</h2>
          <img
            src="/adobe-xd-login-page-template.png"
            alt="illustration"
            className="login-illustration"
          />
        </div>

        {/* Right */}
        <div className="login-right">
          <h2>Welcome Back!</h2>
          <p className="subtitle">Login to continue</p>

          <form className="login-form" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email address"
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && <p className="error-text">{error}</p>}

            <div className="form-options">
              <label className="link">
                <input type="checkbox" /> Remember Me
              </label>
              <a href="#" className="link">
                Forgot password?
              </a>
            </div>

            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p className="signup">
            New User? <a href="#">Sign Up</a>
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="login-footer">
        <span>© 2021 Copyright Reserved</span>
        <span>
          <a href="#">Terms and Conditions</a> |{" "}
          <a href="#">Privacy Policy</a>
        </span>
      </footer>
    </div>
  );
};

export default Login;
