import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { Table, Input } from 'antd';
import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import {
  actManageUser,
  actDeleteUser,
} from './duck/actions';
import {
  actDetailUser
} from '../Dashboard/EditUser/duck/actions';

export default function ManageUser() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dataUser = useSelector((state) => state.manageUserReducer.data);
  const userDetail = useSelector((state) => state.detailUserReducer.data);

  useEffect(() => {
    dispatch(actManageUser());
  }, [dispatch]);

  useEffect(() => {
    if (userDetail) {
      navigate('/admin/edit-user', { replace: true });
    }
  }, [userDetail, navigate]);

  const { Search } = Input;
  const onSearch = value => {
    dispatch(actManageUser(value));
  };

  const handleInfoEditUser = async (email) => {
    const user = dataUser?.find((user) => user.email === email);
    dispatch(actDetailUser(user));
  };

  const columns = [
    {
      title: 'Tài Khoản',
      dataIndex: 'taiKhoan',
      sorter: (a, b) => {
        let taiKhoanA = a.taiKhoan.toLowerCase().trim();
        let taiKhoanB = b.taiKhoan.toLowerCase().trim();
        if (taiKhoanA > taiKhoanB) {
          return 1;
        }
        return -1;
      },
      width: '15%',
    },
    {
      title: 'Mật Khẩu',
      dataIndex: 'matKhau',
      sorter: (a, b) => {
        let matKhauA = a.matKhau.toLowerCase().trim();
        let matKhauB = b.matKhau.toLowerCase().trim();
        if (matKhauA > matKhauB) {
          return 1;
        }
        return -1;
      },
      width: '15%',
    },
    {
      title: 'Họ Tên',
      dataIndex: 'hoTen',
      sorter: (a, b) => {
        let hoTenA = a.hoTen.toLowerCase().trim();
        let hoTenB = b.hoTen.toLowerCase().trim();
        if (hoTenA > hoTenB) {
          return 1;
        }
        return -1;
      },
      width: '20%',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      sorter: (a, b) => {
        let emailA = a.email.toLowerCase().trim();
        let emailB = b.email.toLowerCase().trim();
        if (emailA > emailB) {
          return 1;
        }
        return -1;
      },
      width: '20%',
    },
    {
      title: 'Số Điện Thoại',
      dataIndex: 'soDT',
      sorter: (a, b) => {
        let soDTA = a.soDT.toLowerCase().trim();
        let soDTB = b.soDT.toLowerCase().trim();
        if (soDTA > soDTB) {
          return 1;
        }
        return -1;
      },
      width: '15%',
    },
    {
      title: 'Thao Tác',
      dataIndex: 'thaoTac',
      width: '15%',
      render: (text, record) => record.tacVu,
    }
  ];

  const renderData = () => {
    if (!dataUser) {
      return [];
    }
    const data = dataUser?.map((item, index) => {
      return {
        key: index,
        taiKhoan: item.taiKhoan,
        matKhau: item.matKhau,
        hoTen: item.hoTen,
        email: item.email,
        soDT: item.soDT,
        tacVu: (<Fragment>
          <NavLink
            key={1}
            className='text-2xl'
            to={`/admin/edit-user/${item.email}`}
            onClick={() => handleInfoEditUser(item.email)}

          > <EditOutlined
              className='text-yellow-600'
            />
          </NavLink >

          <NavLink
            key={2}
            className='ml-3 text-3xl'
            onClick={() => {
              if (window.confirm('Bạn có chắc muốn xoá tài khoản này không: ' + item.taiKhoan)) {
                dispatch(actDeleteUser(item.taiKhoan));
                dispatch(actManageUser());
              }
            }}
          ><DeleteOutlined
              className='text-red-600'
            />
          </NavLink>
        </Fragment >
        ),
      };
    });
    return <Table columns={columns} dataSource={data} />
  };

  return (
    <Fragment>
      <div
        className='heading-page text-cyan-600'>
        DANH SÁCH NGƯỜI DÙNG
      </div>
      <hr className='h-divider mb-4' />
      <NavLink
        to={'/admin/add-user'}
        className='text-white button-add-new'
        onClick={() => {
          navigate('admin/Dashboard/AddUser');
        }}
      >
        Thêm người dùng
      </NavLink>

      <Search
        className='my-4 bg-blue-500'
        placeholder='input search text'
        enterButton={<SearchOutlined />}
        type="text"
        size='large'
        onSearch={onSearch}
        allowClear
      />
      {renderData()}
    </Fragment>
  );
};



