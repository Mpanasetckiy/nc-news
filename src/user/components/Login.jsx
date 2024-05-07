import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../context/auth-context";
import { useHttpClient } from "../../hooks/http-hook";

const Login = () => {
  const { isLoggedIn, user, login, logout } = useContext(AuthContext);
  const { isLoading, sendRequest, error } = useHttpClient();
  const [users, setUsers] = useState([]);
  const [currentSelectedUser, setCurrentSelectedUser] = useState("");
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const { users } = await sendRequest(
        "https://be-nc-news-0820.onrender.com/api/users"
      );

      if (!isLoading) {
        setUsers(users);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleClick = () => {
    setCurrentSelectedUser("");
    navigate("/profile");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const currentUser = users.find((user) => {
      return user.username === currentSelectedUser;
    });
    if (currentUser) {
      login(currentUser);
      navigate("/profile");
    }
  };

  const handleChange = (e) => {
    const username = e.target.value;
    setCurrentSelectedUser(username);
  };

  return (
    <section className="login-form">
      <form onSubmit={handleSubmit}>
        <select onChange={handleChange} name="" id="user-select">
          <option value="">--Please choose an user--</option>
          {users.map(({ username }) => {
            return (
              <option key={username} value={username}>
                {username}
              </option>
            );
          })}
        </select>
        <div>
          <button onClick={handleClick}>CANCEL</button>
          <button>SIGN IN</button>
        </div>
      </form>
    </section>
  );
};

export default Login;
