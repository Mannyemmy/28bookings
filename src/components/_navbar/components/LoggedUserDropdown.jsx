import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../../features/slices/authSlice";
import { signout } from "../../../services/authServices";
import Placeholder from "../../../assets/user_picture_placeholder.png"
import { url } from "../../../helper";

const LoggedUserDropdown = () => {
  const dispatch = useDispatch();
  const  user  = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    signout();
    dispatch(logout());
  };

  return (
    <Fragment>
      <div className="dropdown d-inline-block logged-user-dropdown px-0">
        <button
          type="button"
          className="btn dropdown-togle py-0 px-1 mx-2"
          data-bs-toggle="dropdown"
        >
          <img
            src={`${url}${user.profile[0].picture}` || Placeholder}
            alt={`${user.first_name}'s profile`}
            className="me-1"
          />
          <span className="d-none d-md-inline-block">
            {user.first_name}
            <i className="fa fa-chevron-down text-secondary"></i>
          </span>
        </button>
        <ul className="dropdown-menu px-0 mx-0">
          <li>
            <Link className="dropdown-item ps-2" to="/inbox">
              {" "}
              Inbox{" "}
            </Link>{" "}
          </li>
          <li>
            <Link className="dropdown-item ps-2" to="/my-orders">
              {" "}
              Orders{" "}
            </Link>{" "}
          </li>
          <li>
            <Link className="dropdown-item ps-2" to="/rentals">
              {" "}
              Rentals{" "}
            </Link>{" "}
          </li>
          <li>
            <Link className="dropdown-item ps-2" to="/favorites">
              {" "}
              Favorites{" "}
            </Link>{" "}
          </li>
          <li>
            <Link className="dropdown-item ps-2" to="/profile">
              {" "}
              Profile{" "}
            </Link>{" "}
          </li>
          <li>
            <Link className="dropdown-item ps-2" to="/create-item">
              {" "}
              Create Item{" "}
            </Link>{" "}
          </li>
          <li className="border-top">
            <button
              className="btn ps-2 p-0 text-danger logout-btn"
              onClick={handleLogout}
            >
              <span className="bi bi-box-arrow-left"></span> Log out
            </button>
          </li>
        </ul>
      </div>
    </Fragment>
  );
};

export default LoggedUserDropdown;
