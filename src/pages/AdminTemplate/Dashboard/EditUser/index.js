import React, { Fragment, useState, useEffect } from 'react';
import { Form, Input, Radio, Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { actUpdateUser } from './duck/actions';

const EditUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [componentSize, setComponentSize] = useState('default');
  const [form] = Form.useForm();

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  const userDetail = useSelector(state => state.detailUserReducer.userDetail);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      hoTen: userDetail?.hoTen,
      taiKhoan: userDetail?.taiKhoan,
      matKhau: userDetail?.matKhau,
      email: userDetail?.email,
      soDT: userDetail?.soDT,
      maLoaiNguoiDung: userDetail?.maLoaiNguoiDung,
    },

    onSubmit: async (values) => {
      values.maNhom = 'GP01';
      await dispatch(actUpdateUser(values, navigate));
    }
  });

  return (
    <Fragment>

      <Form
        layout='horizontal'
        size={componentSize}
        labelCol={{ span: 4, }}
        wrapperCol={{ span: 14, }}
        style={{ maxWidth: 1000, }}
        onSubmitCapture={formik.handleSubmit}
        onValuesChange={onFormLayoutChange}
      >
        <div
          className='heading-page text-orange-800'>
          CHỈNH SỬA THÔNG TIN
        </div>
        <hr className='h-divider mb-4' />

        <Form.Item
          label='Kích thước chữ'
          name='size'>
          <Radio.Group>
            <Radio.Button value='small'>Small</Radio.Button>
            <Radio.Button value='default'>Default</Radio.Button>
            <Radio.Button value='large'>Large</Radio.Button>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          label='Họ Tên'
          htmlFor='hoTen'
        >
          <Input
            name='hoTen'
            placeholder='Nhập họ tên'
            value={formik.values.hoTen}
            onChange={formik.handleChange}
          />
        </Form.Item>

        <Form.Item
          label='Tài Khoản'
          htmlFor='taiKhoan'
        >
          <Input
            name='taiKhoan'
            value={formik.values.taiKhoan}
            disabled={true}
          />
        </Form.Item>

        <Form.Item
          label='Mật Khẩu'
          htmlFor='matKhau'
        >
          <Input
            name='matKhau'
            placeholder='Nhập mật khẩu'
            value={formik.values.matKhau}
            onChange={formik.handleChange}
          />
        </Form.Item>

        <Form.Item
          label='Email'
          htmlFor='email'
        >
          <Input
            name='email'
            placeholder='Nhập email'
            value={formik.values.email}
            onChange={formik.handleChange}
          />
        </Form.Item>

        <Form.Item
          label='Số Điện Thoại'
          htmlFor='soDT'
        >
          <Input
            name='soDT'
            placeholder='Nhập số điện thoại'
            value={formik.values.soDT}
            onChange={formik.handleChange}
          />
        </Form.Item>

        <Form.Item
          label='Mã Loại'
          htmlFor='maLoaiNguoiDung'
        >
          <Select
            placeholder='Chọn loại người dùng'
            value={formik.values.maLoaiNguoiDung}
            onChange={formik.handleChange}
          >
            <Select.Option value='QuanTri'>Quản Trị</Select.Option>
            <Select.Option value='KhachHang'>Khách Hàng</Select.Option>
          </Select>
        </Form.Item >

        <Form.Item label='Thao tác'>
          <button
            type='submit'
            className='button-submit-edit'
          >
            Cập nhật
          </button>
        </Form.Item>
      </Form>

    </Fragment >
  );
};

export default EditUser;