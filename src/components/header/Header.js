import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdLogout } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Utils } from "@service/utils/utils.service";
import useLocalStorage from "@hooks/useLocalStorage";
import useSessionStorage from "@hooks/useSessionStorage";
import { userService } from "@service/api/user/user.service";
import Logo from "@assets/Images/Logo.jpg";

function Header() {
  const { token } = useSelector((state) => state.user);
  const [deleteStorageUsername] = useLocalStorage("username", "delete");
  const [setLoggedIn] = useLocalStorage("keepLoggedIn", "set");
  const [deleteSessionPageReload] = useSessionStorage("pageReload", "delete");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const Logout = async () => {
    try {
      setLoggedIn(false);
      Utils.clearStore({ dispatch, deleteStorageUsername, deleteSessionPageReload, setLoggedIn });
      await userService.logoutUser();
      console.log("User logged out");
      navigate("/");
    } catch (error) {
      Utils.dispatchNotification(error.response.data.message, "error", dispatch);
    }
  };

  return (
    <header className="container">
      <ul style={{ display: "flex", justifyContent: "space-between" }}>
        <li>
          <Link to="/">
            <img style={{ maxWidth: "50px" }} src={Logo} alt="logo" />
          </Link>
        </li>
        <li>
          <Link to="/events">Events</Link>
        </li>
        {!token && (
          <li>
            <Link to="/app/login">Login</Link>
          </li>
        )}
        {token && (
          <li>
            <Link to="/admin-dashboard">Admin</Link>
          </li>
        )}
        {token && (
          <li>
            <MdLogout onClick={Logout} />
          </li>
        )}
      </ul>
    </header>
  );
}

export default Header;
