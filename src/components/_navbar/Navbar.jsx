import React, { useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import logo from "../../assets/logo.png";
import Signup from "./components/Signup";
import SignIn from "./components/SignIn";
import { useSelector } from "react-redux";
import LoggedUserDropdown from "./components/LoggedUserDropdown";

const Navbar = ({showLogin}) => {
  const inputSearchRef = useRef(null);
  const [showSingup, setShowSignUp] = React.useState(true);
  const isAuth = useSelector((state) => state.auth.isLoggedIn);
  const history = useHistory();
  const [searchError, setSearchError] = React.useState(false);

  const handleSearchClick = (event) => {
    event.preventDefault();
    if (inputSearchRef.current.value.length < 1) {
      setSearchError(true);
    } else {
      setSearchError(false);
      history.push(`/search/${ inputSearchRef.current.value }`)
    }
  };

  return (
    <nav className="sticky-top bg-white navigation-bar">
      <div className="_navbar p-0 m-0">
        <div className="add-shadow d-flex flex-nowrap justify-content-between ps-1 align-items-center p-0 py-1 ">
          <div className="d-flex flex-nowrap align-items-center search-and-logo-wrapper">
            <img src={logo} alt="logo" onClick={() => history.push("/")} />
            <div className="ms-3 ms-md-4 input-group">
              <input
                ref={inputSearchRef}
                type="search"
                className="form-control"
                placeholder="Find almost ( anything ).."
                onKeyPress={(event) => event.key === 'Enter' && handleSearchClick(event)}
              />
              <span
                onClick={handleSearchClick}
                data-bs-toggle="tooltip"
                title="Search almost anything.."
                className="input-group-text px-1 sp-1 bi ps-md-2 bi-search pe-2"
              ></span>
            </div>
          </div>
          <div className="d-flex flex-nowrap align-items-center">
            <Link to={"/enterprise"} className="btn px-1 mx-2 m-hide">
              {" "}
              Enterprise{" "}
            </Link>
            <Link to={"/how-it-worked"} className="btn px-1 mx-2 m-hide">
              {" "}
              How it Works{" "}
            </Link>
            <Link to={"/list-an-item"} className="btn px-1 mx-2 m-hide">
              {" "}
              List an Item{" "}
            </Link>

            {isAuth ? (
              <LoggedUserDropdown />
            ) : (
              <button
                className="btn py-1 mx-2 m-hide login-signup-btn"
                data-bs-toggle="offcanvas"
                data-bs-target="#signup"
              >
                Login or Sign up
              </button>
            )}
            <span
              className=" hambuger me-2 me-md-3 px-1"
              data-bs-toggle="dropdown"
            ></span>
            <ul className="dropdown-menu">
              <li className="d-sm-none">
                {!isAuth && (
                  <span
                    className="dropdown-item px-1 login-signup-btn"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#signup"
                    id="login-btn"
                   
                  >
                    Login or Sign up
                  </span>
                )}
              </li>
              <li>
                <Link className="dropdown-item px-1" to={"/list-an-item"}>
                  List an Item
                </Link>
              </li>
              <li>
                <Link className="dropdown-item px-1" to={"/how-it-worked"}>
                  {" "}
                  How it Works
                </Link>
              </li>
              <li>
                <Link className="dropdown-item px-1" to={"/enterprise"}>
                  Enterprise
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className={`offcanvas offcanvas-end  `} id="signup">
          {showSingup ? (
            <Signup setShowSignUp={setShowSignUp} />
          ) : (
            <SignIn setShowSignUp={setShowSignUp} />
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
