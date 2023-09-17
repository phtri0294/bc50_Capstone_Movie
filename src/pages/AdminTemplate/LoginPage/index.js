import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate, Navigate } from 'react-router-dom';
import { actLogin } from './duck/actions';

export default function Login(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const error = useSelector((state) => state.loginReducer.error);

  const [state, setState] = useState({
    taiKhoan: '',
    matKhau: '',
  });

  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(actLogin(state, navigate));
  };

  const renderError = () => {
    return (
      error && (
        <div className='alert alert-danger'>{error}</div>
      )
    );
  };

  if (localStorage.getItem('UserAdmin')) {
    return <Navigate replace to='/admin/dashboard' />
  }

  return (
    <div className='flex justify-center items-center min-h-screen'>
      <form
        onSubmit={handleLogin}
        className='lg:w-1/2 xl:max-w-screen-sm'
      >
        <div className='mt-10 px-12 sm:px-24 md:px-48 lg:px-12 lg:mt-16 xl:px-24 xl:max-w-2xl'>
          <h2 className='text-center text-4xl text-indigo-900 font-display font-semibold lg:text-left xl:text-5xl
      xl:text-bold'>Đăng nhập</h2>


          <div className='mt-12'>
            <div>
              <div>
                <div className='text-sm font-bold text-gray-700 tracking-wide'>Tài khoản</div>

                <input
                  name='taiKhoan'
                  onChange={handleOnchange}
                  className='w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500'
                  placeholder='Nhập vào tài khoản' />
              </div>

              <div className='mt-8'>
                <div className='flex justify-between items-center'>
                  <div className='text-sm font-bold text-gray-700 tracking-wide'>
                    Mật khẩu
                  </div>
                </div>

                <input
                  name='matKhau'
                  onChange={handleOnchange}
                  className='w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500'
                  placeholder='Nhập vào mật khẩu' />
              </div>
              {renderError()}
              <div className='mt-10'>
                <button
                  className='bg-indigo-500 text-gray-100 p-4 w-full rounded-full tracking-wide
                  font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600
                  shadow-lg'
                  type='submit'
                >
                  Đăng nhập
                </button>
              </div>
            </div>

            <div
              className='mt-12 text-sm font-display font-semibold text-gray-700 text-center'
            >
              Bạn chưa có tài khoản ?
              <NavLink
                to='/register'
                className='cursor-pointer text-indigo-600 hover:text-indigo-800 ml-2'>
                Đăng ký
              </NavLink>
            </div>
          </div>

        </div>
      </form>
    </div >
  );
};
