import React, { Component } from "react";
import { NavLink } from "react-router-dom";

export default class Navbar extends Component {
  render() {
    const admin = JSON.parse(localStorage.getItem("UserAdmin"));
    const customer = JSON.parse(localStorage.getItem("Customer"));

    const destroySession = () => {
      if (admin) {
        localStorage.removeItem("UserAdmin");
      }
      if (customer) {
        localStorage.removeItem("Customer");
      }
      window.location.reload();
    };

    return (
      <nav className="navbar navbar-expand-md bg-dark navbar-dark">
        {/* Brand */}
        <a className="navbar-brand" href="#">
          Cybersoft Movies
        </a>
        {/* Toggler/collapsibe Button */}
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#collapsibleNavbar"
        >
          <span className="navbar-toggler-icon" />
        </button>
        {/* Navbar links */}
        <div className="collapse navbar-collapse" id="collapsibleNavbar">
          <ul className="navbar-nav">
            {/* <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  isActive ? "my-active nav-link" : "nav-link"
                }
                to="/"
              >
                Home
              </NavLink>
            </li> */}
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  isActive ? "my-active nav-link" : "nav-link"
                }
                to="/"
              >
                List Movie
              </NavLink>
            </li>
            {/* <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  isActive ? "my-active nav-link" : "nav-link"
                }
                to="/about"
              >
                About
              </NavLink>
            </li> */}

            {/* <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  isActive ? "my-active nav-link" : "nav-link"
                }
                to="/hooks"
              >
                Hooks
              </NavLink>
            </li> */}
          </ul>
          <ul className="navbar-nav user-nav">
            {customer || admin != null ? (
              <>
                {" "}
                <li className="nav-item">
                  <NavLink
                    className={({ isActive }) => "nav-link"}
                    to={admin ? "/auth" : "/"}
                  >
                    {customer?.hoTen || admin?.hoTen}
                  </NavLink>
                </li>
                |
                <li className="nav-item">
                  <NavLink
                    className={({ isActive }) => "nav-link"}
                    onClick={destroySession}
                  >
                    logout
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                {" "}
                <li className="nav-item">
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "my-active nav-link" : "nav-link"
                    }
                    to="/auth"
                  >
                    Đăng Nhập
                  </NavLink>
                </li>
                |
                <li className="nav-item">
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "my-active nav-link" : "nav-link"
                    }
                    to="/register"
                  >
                    Đăng Kí
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    );
  }
}
