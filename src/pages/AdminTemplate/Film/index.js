import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { Input, Table } from 'antd';
import {
  DeleteOutlined,
  EditOutlined,
  CalendarOutlined,
  SearchOutlined
} from '@ant-design/icons';
import {
  actManageFilm,
  actSearchFilm,
  actDeleteFilm
} from '../Film/duck/actions';
import { actDetailFilm } from '../Film/EditFilm/duck/actions';

export default function ListFilm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dataFilm = useSelector((state) => state.manageFilmReducer.data);

  useEffect(() => {
    dispatch(actManageFilm());
  }, []);

  const { Search } = Input;
  const onSearch = value => {
    dispatch(actSearchFilm(value));
  };

  const columns = [
    {
      title: 'Mã phim',
      dataIndex: 'maPhim',
      width: 50,
      onFilter: (value, record) => record.name.indexOf(value) === 0,
      sorter: (a, b) => a.maPhim - b.maPhim,
      sortDirections: ['descend'],
    },
    {

      title: 'Tên phim',
      dataIndex: 'tenPhim',
      defaultSortOrder: 'descend',
      width: 100,
      sorter: (a, b) => a.tenPhim.length - b.tenPhim.length,
    },
    {
      title: 'Hình ảnh',
      dataIndex: 'hinhAnh',
      width: 100,

    },
    {
      title: 'Mô tả',
      dataIndex: 'moTa',
      width: 150,
    },
    {
      title: 'Thao Tác',
      dataIndex: '',
      render: (item, film) => {
        return (
          <Fragment>
            <NavLink
              className='text-2xl'
              to={`/admin/edit-film/${film.maPhim}`}
              onClick={() => {
                dispatch(actDetailFilm(film.maPhim))
              }}
            ><EditOutlined
                className='text-yellow-600'
              />
            </NavLink>

            <NavLink
              className='ml-3 text-2xl'
              onClick={() => {
                if (window.confirm('Bạn có chắc muốn xoá phim này không: ' + film.tenPhim)) {
                  dispatch(actDeleteFilm(item.maPhim));
                  dispatch(actManageFilm());
                }
              }}
            ><DeleteOutlined
                className='text-red-600'
              />
            </NavLink>

            <NavLink
              className='ml-3 text-2xl'
              to={`/admin/show-time/${film.maPhim}/${film.tenPhim}`}
              onClick={() => {
                localStorage.setItem('filmParams', JSON.stringify({
                  maPhim: film.maPhim,
                  tenPhim: film.tenPhim,
                }));
                sessionStorage.setItem('filmImageURL', film.hinhAnh);
              }}
            >
              <CalendarOutlined
                className='text-green-800'
              />
            </NavLink>
          </Fragment>
        )
      },
      width: 80,
    },
  ];

  const renderData = () => {
    let data = dataFilm?.map((item, index) => {
      return {
        key: index,
        maPhim: item.maPhim,
        tenPhim: item.tenPhim,
        hinhAnh: <img width={120} height={100} src={item.hinhAnh} alt={item.tenPhim} />,
        moTa: item.moTa
      };
    });

    return <Table
      columns={columns}
      dataSource={data}
      scroll={{ x: 1000, }}
    />
  };

  return (
    <Fragment>
      <div
        className='heading-page text-cyan-600'>
        DANH SÁCH PHIM
      </div>
      <hr className='h-divider mb-4' />
      <NavLink
        to={'/admin/add-film'}
        className='text-white button-add-new'
        onClick={() => {
          navigate('admin/Film/AddFilm');
        }}
      >
        Thêm phim mới
      </NavLink>

      <Search
        className='my-4 bg-blue-500'
        placeholder='input search text'
        enterButton={<SearchOutlined />}
        size='large'
        onSearch={onSearch}
        allowClear
      />
      {renderData()}
    </Fragment>
  );
};
