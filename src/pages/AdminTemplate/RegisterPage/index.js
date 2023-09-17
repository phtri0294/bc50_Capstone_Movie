import React, { Fragment, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, NavLink } from 'react-router-dom';
import { useFormik } from 'formik';
import {
  Form,
  Input,
} from 'antd';
import { actRegister } from './duck/actions';

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [componentSize, setComponentSize] = useState('default');

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      hoTen: '',
      taiKhoan: '',
      matKhau: '',
      email: '',
      soDT: '',
      maLoaiNguoiDung: '',
    },

    onSubmit: async (values) => {
      values.maNhom = 'GP01';
      await dispatch(actRegister(values, navigate));
    }
  });

  return (
    <Fragment>
      <div className="container">
        <div className="card bg-light">
          <article className="card-body mx-auto" style={{ maxWidth: 400 }}>
            <div
              className="mt-3  text-center text-3xl text-blue-900 font-medium">
              ĐĂNG KÝ
            </div>
            <hr className='h-divider my-3' />
            {/* <Formik
              initialValues={initialValues}
              onSubmit={onSubmitForm}
            > */}
            <Form
              size={componentSize}
              onFinish={formik.handleSubmit}
              onValuesChange={onFormLayoutChange}
            >

              <Form.Item className='m-auto'>
                <div className="form-group input-group">
                  <div className="input-group-prepend ">
                    <span
                      className="input-group-text">
                      <i className="fa fa-user" />
                    </span>
                  </div>
                  <Input
                    name='hoTen'
                    className="form-control"
                    placeholder="Họ tên"
                    type="text"
                    onChange={formik.handleChange}
                  />
                </div> {/* form-group// */}
              </Form.Item>

              <Form.Item className='m-auto'>
                <div className="form-group input-group">
                  <div className="input-group-prepend">
                    <span
                      className="input-group-text">
                      <i className="fa fa-building" />
                    </span>
                  </div>
                  <Input
                    name='taiKhoan'
                    className="form-control"
                    placeholder="Tên đăng nhập"
                    type="text"
                    onChange={formik.handleChange}
                  />
                </div> {/* form-group// */}
              </Form.Item>

              <Form.Item className='m-auto'>
                <div className="form-group input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fa fa-lock" />
                    </span>
                  </div>
                  <Input
                    name='matKhau'
                    className="form-control"
                    placeholder="Create password"
                    type="text"
                    onChange={formik.handleChange}
                  />
                </div> {/* form-group// */}
              </Form.Item>

              <Form.Item className='m-auto'>
                <div className="form-group input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fa fa-envelope" />
                    </span>
                  </div>
                  <Input
                    name='email'
                    className="form-control"
                    placeholder="Email"
                    type="email"
                    onChange={formik.handleChange}
                  />
                </div> {/* form-group// */}
              </Form.Item>

              <Form.Item className='m-auto'>
                <div className="form-group input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fa fa-phone" />
                    </span>
                  </div>
                  <Input
                    name='soDt'
                    className="form-control"
                    placeholder="Số điện thoại"
                    type="text"
                    onChange={formik.handleChange}
                  />
                </div> {/* form-group// */}
              </Form.Item>

              <Form.Item className='m-auto'>
                <div className="form-group">
                  <button
                    type="submit"
                    className="btn btn-success btn-block"> Đăng Ký
                  </button>
                </div> {/* form-group// */}
              </Form.Item>

              <div className='btn-redirect-login text-center'>
                <div>
                  <NavLink to={'/auth'} className=''>
                    <p>Bạn đã có tài khoản! Hãy đăng nhập tại đây</p>
                  </NavLink>
                </div>
              </div>
            </Form>
            {/* </Formik> */}
          </article >
        </div > {/* card.// */}
      </div >
      {/*container end.//*/}
    </Fragment >
  );
};
