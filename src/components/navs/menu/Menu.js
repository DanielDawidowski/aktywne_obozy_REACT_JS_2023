import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdLogout } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Utils } from "@service/utils/utils.service";
import useLocalStorage from "@hooks/useLocalStorage";
import useSessionStorage from "@hooks/useSessionStorage";
import { userService } from "@service/api/user/user.service";
import "@components/navs/menu/Menu.scss";

function Menu() {
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
    <ul className="menu">
      <li>
        <Link to="/events">Wyjazdy</Link>
      </li>
      <li>
        <Link to="/contact">Kontakt</Link>
      </li>
      {!token && (
        <li>
          <Link to="/app/login">Login</Link>
        </li>
      )}
      {token && (
        <>
          <li>
            <Link to="/admin">Admin</Link>
          </li>

          <li>
            <MdLogout onClick={Logout} />
          </li>
        </>
      )}
    </ul>
  );
}

export default Menu;
