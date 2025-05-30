import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Login.css";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("inspector");
  const [error, setError] = useState("");

  
  const users = [
    { username: "inspector1", password: "pass123", role: "inspector" },
    { username: "validator1", password: "val123", role: "validator" }
  ];

  const handleLogin = () => {
    const matchedUser = users.find(
      (user) =>
        user.username === username &&
        user.password === password &&
        user.role === role
    );

    if (matchedUser) {
      login(matchedUser.username, matchedUser.role);
      navigate("/");
    } else {
      setError("Invalid credentials or role.");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <p className="error">{error}</p>}
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <select onChange={(e) => setRole(e.target.value)} value={role}>
        <option value="inspector">Inspector</option>
        <option value="validator">Validator</option>
      </select>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;
