import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import "./Home.css"; 

function Home() {
  const { user, logout } = useAuth();

  return (
    <div className="home-container">
      <div className="home-box">
        <h2 className="home-heading">
          Welcome, <span className="username">{user.username}</span>
        </h2>
        <p className="role">({user.role})</p>

        {user.role === "inspector" ? (
          <Link to="/inspection" className="home-button blue">
            🛠 Go to Inspection Form
          </Link>
        ) : (
          <Link to="/validation" className="home-button green">
            ✅ Go to Validation Page
          </Link>
        )}

        <Link to="/history" className="home-button purple">📜 View History</Link>

        <button onClick={logout} className="home-button red">🚪 Logout</button>
      </div>
    </div>
  );
}

export default Home;
