import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../context/auth-context";

const Profile = () => {
  const { isLoggedIn, user, login, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  return isLoggedIn ? (
    <section>
      <div className="user-card">
        <h2>Hello {user.name}!</h2>
        <p>@{user.username}</p>
        <img src={user.avatar_url} alt="user avatar" />
      </div>
      <button onClick={logout}>SIGN OUT</button>
    </section>
  ) : (
    <section className="profile">
      <h2>Welcome to the NC News App</h2>
      <div>
        <button onClick={handleLoginClick}>Sign In</button>
        <button> Sign Up</button>
      </div>
    </section>
  );
};

export default Profile;
