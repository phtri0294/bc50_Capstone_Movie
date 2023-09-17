import React, { useState, Fragment } from 'react';
import { NavLink } from 'react-router-dom';

export default function Sidebar() {
  const [isToggled, setIsToggled] = useState(false);

  function getItem(label, key, children) {
    return {
      key,
      children,
      label,
    };
  }

  const items = [
    getItem(
      <Fragment >
        User
      </Fragment>,
      '1',
      [
        getItem(<NavLink to={'/admin/dashboard'}>Danh sách</NavLink>, 'admin/dashboard'),
        getItem(<NavLink to={'/admin/add-user'}>Thêm mới</NavLink>, 'admin/add-user'),
      ]
    ),

    getItem(<hr className='sidebar-divider my-0' />),

    getItem(
      <Fragment>
        Film
      </Fragment>,
      '2',
      [
        getItem(<NavLink to={'/admin/film'}>Danh sách</NavLink>, 'admin/film'),
        getItem(<NavLink to={'/admin/add-film'}>Thêm mới</NavLink>, 'admin/add-film'),
      ]
    ),
  ];

  return (
    <ul
      className={
        'navbar-nav bg-gradient-primary sidebar sidebar-dark accordion py-1 space-y-1 sm:space-y-2' +
        (isToggled ? ' toggled' : '')
      }
      id='accordionSidebar'
    >
      {/* Sidebar - Brand */}
      <div className='logo-container text-center logo-test py-1'>
        <img
          className='logo w-full mx-auto'
          src='https://cybersoft.edu.vn/wp-content/uploads/2022/10/cyberlogo-white.png'
          alt='Logo'
        />
      </div>

      <hr className='sidebar-divider mb-3' />

      {/* Nav Item - Dashboard */}
      <h5
        className='custom-dashboard mb-2 font-medium'
      >
        DASHBOARD
      </h5>
      <hr className='sidebar-divider mb-3' />

      {items.map((item, index) => (
        <li key={item.key} className='nav-item'>
          {typeof item.children === 'undefined' ? (

            <NavLink className='nav-link' to={'/' + item.key}>
              {item.icon} <span>{item.label}</span>
            </NavLink>

          ) : (
            <div>
              <a
                className='nav-link collapsed'
                href='/#'
                data-toggle='collapse'
                data-target={`#collapse${item.key}`}
                aria-expanded='true'
                aria-controls={`collapse${item.key}`}
              >
                {item.icon} <span>{item.label}</span>
              </a>
              
              <div
                id={`collapse${item.key}`}
                className='collapse'
                aria-labelledby={`heading${item.key}`}
                data-parent='#accordionSidebar'
              >
                <div className='bg-white py-2 collapse-inner rounded'>
                  {item.children.map(childItem => (
                    <NavLink
                      key={childItem.key}
                      className='collapse-item'
                      to={'/' + childItem.key}
                    >
                      {childItem.label}
                    </NavLink>
                  ))}
                </div>
              </div>
            </div>
          )}
        </li>
      ))}
      <hr className='sidebar-divider d-none d-md-block' />

      {/* Sidebar Toggler (Sidebar) */}
      <div className='text-center d-none d-md-inline'>
        <button
          className='rounded-circle border-0'
          id='sidebarToggle'
          onClick={() => setIsToggled(!isToggled)}
        />
      </div>
    </ul>
  );
};

