import { useNavigate, useLocation } from "react-router-dom";

import Home from "../assets/icon-home.png";
import HomeActive from "../assets/icon-home-active.png";
import Search from "../assets/icon-search.png";
import Message from "../assets/icon-envelope.png";
import MessageActive from "../assets/icon-message-active.png";
import Profile from "../assets/icon-user.png";
import ProfileActive from "../assets/icon-user-active.png";

const Navbar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const profileRoutes = ["/login", "/profile", "/signup"];

  const handleHomeClick = () => {
    navigate("/");
  };

  const handleProfileClick = () => {
    navigate("/profile");
  };

  return (
    <nav>
      <ul>
        <li>
          <img
            src={pathname === "/" ? HomeActive : Home}
            onClick={handleHomeClick}
            alt="icon home active"
          />
        </li>
        <li>
          <img src={Search} alt="icon search" />
        </li>
        <li>
          <img src={Message} alt="icon message" />
        </li>
        <li>
          <img
            src={profileRoutes.includes(pathname) ? ProfileActive : Profile}
            onClick={handleProfileClick}
            alt="icon profile"
          />
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
