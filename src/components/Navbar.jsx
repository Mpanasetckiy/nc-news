import { useNavigate } from "react-router-dom";

import Home from "../assets/icon-home.png";
import HomeActive from "../assets/icon-home-active.png";
import Search from "../assets/icon-search.png";
import Message from "../assets/icon-envelope.png";
import MessageActive from "../assets/icon-message-active.png";
import Profile from "../assets/icon-user.png";

const Navbar = () => {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate("/");
  };
  return (
    <nav>
      <ul>
        <li>
          <img src={Home} alt="icon home active" onClick={handleHomeClick} />
        </li>
        <li>
          <img src={Search} alt="icon search" />
        </li>
        <li>
          <img src={Message} alt="icon message" />
        </li>
        <li>
          <img src={Profile} alt="icon profile" />
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
