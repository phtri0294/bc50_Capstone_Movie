import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Topbar() {
  const userAdmin = JSON.parse(localStorage.getItem('UserAdmin'));

  const handleLogout = () => {
    localStorage.removeItem('UserAdmin');
  };

  return (
    <nav className='navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow'>
      {/* Sidebar Toggle (Topbar) */}
      <button
        id='sidebarToggleTop'
        className='btn btn-link d-md-none rounded-circle mr-3'
      >
        <i className='fa fa-bars' />
      </button>

      <div className='bg-white'>
        {/* ... */}
        <div className='flex items-center justify-start'>
        </div>
        {/* ... */}
      </div>

      {/* Topbar Navbar */}
      <ul className='navbar-nav ml-auto'>
        {/* Nav Item - User Information */}
        <li className='nav-item  no-arrow'>
          <a
            className='nav-link'
          >
            <span className='mr-3 d-none d-lg-inline text-green-700 font-medium '>
              {userAdmin?.hoTen}
            </span>
            <i className='fas fa-user fa-sm fa-fw mr-2 text-gray-400' />
          </a>
        </li>

        {/* Divider */}
        <div className='topbar-divider d-none d-sm-block' />

        {/* Nav Item - User Logout */}
        <li className='nav-item no-arrow'>
          <NavLink
            className='nav-link'
            to='/'
            onClick={(e) => {
              handleLogout();
            }}
          >
            <span className='d-none d-lg-inline text-red-600 hover:bg-orange-400 hover:text-white transition-all  '>
              Log Out
            </span>
          </NavLink>
        </li>

      </ul>
    </nav >
  );
};
