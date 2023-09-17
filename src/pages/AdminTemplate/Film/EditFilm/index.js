import React, { Fragment, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Form,
  Input,
  Radio,
  DatePicker,
  InputNumber,
  Switch,
} from 'antd';
import { actDetailFilm, actUpdateFilm } from './duck/actions';

const EditFilm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const param = useParams();

  const [componentSize, setComponentSize] = useState('default');
  const [imgSrc, setImgSrc] = useState('');
  const data = useSelector((state) => state.detailFilmReducer.data);

  useEffect(() => {
    dispatch(actDetailFilm(param.id));
  }, [dispatch, param.id]);
  

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      maPhim: data?.maPhim,
      tenPhim: data?.tenPhim,
      trailer: data?.trailer,
      moTa: data?.moTa,
      ngayKhoiChieu: data?.ngayKhoiChieu,
      dangChieu: data?.dangChieu,
      sapChieu: data?.sapChieu,
      hot: data?.hot,
      danhGia: data?.danhGia,
      hinhAnh: null
    },

    onSubmit: (values) => {
      values.maNhom = 'GP01'
      let formData = new FormData();
      for (let key in values) {
        if (key !== 'hinhAnh') {
          formData.append(key, values[key])
        } else {
          if (values.hinhAnh !== null) {
            formData.append('File', values.hinhAnh, values.hinhAnh.name)
          }
        }
      }
      dispatch(actUpdateFilm(formData, navigate));
    }
  });

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  const handleChangeDate = (value) => {
    let ngayKhoiChieu = moment(value);
    formik.setFieldValue('ngayKhoiChieu', ngayKhoiChieu);
  };

  const handleChangeSwitch = (name) => {
    return (value) => {
      formik.setFieldValue(name, value)
    };
  };

  const handleChangeInputNumber = (name) => {
    return (value) => {
      formik.setFieldValue(name, value);
    };
  };

  const handleChangeFile = async (e) => {
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      setImgSrc(e.target.result);
    };
    formik.setFieldValue('hinhAnh', file);
  };

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
          name='size'
        >
          <Radio.Group>
            <Radio.Button value='small'>Small</Radio.Button>
            <Radio.Button value='default'>Default</Radio.Button>
            <Radio.Button value='large'>Large</Radio.Button>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          label='Tên phim'
        >
          <Input
            name='tenPhim'
            onChange={formik.handleChange}
            value={formik.values.tenPhim}
          />
        </Form.Item>


        <Form.Item
          label='Trailer'
        >
          <Input
            name='trailer'
            onChange={formik.handleChange}
            value={formik.values.trailer}
          />
        </Form.Item>

        <Form.Item
          label='Mô tả'
        >
          <Input
            name='moTa'
            onChange={formik.handleChange}
            value={formik.values.moTa}
          />
        </Form.Item>

        <Form.Item
          label='Ngày khởi chiếu'
        >
          <DatePicker
            format='DD/MM/YYYY'
            onChange={handleChangeDate}
            value={moment(formik.values.ngayKhoiChieu)}
          />
        </Form.Item>

        <Form.Item
          label='Đang chiếu'
        >
          <Switch
            checked={formik.values.dangChieu}
            onChange={handleChangeSwitch('dangChieu')}
          />
        </Form.Item>

        <Form.Item
          label='Sắp chiếu'
        >
          <Switch
            checked={formik.values.sapChieu}
            onChange={handleChangeSwitch('sapChieu')}
          />
        </Form.Item>

        <Form.Item
          label='Hot'
        >
          <Switch
            checked={formik.values.hot}
            onChange={handleChangeSwitch('hot')}
          />
        </Form.Item>

        <Form.Item
          label='Số sao'
        >
          <InputNumber
            min={1}
            max={10}
            value={formik.values.danhGia}
            onChange={handleChangeInputNumber('danhGia')}
          />
        </Form.Item>

        <Form.Item
          label='Hình ảnh'
        >
          <input
            type='file'
            onChange={handleChangeFile}
            accept='image/png, image/jpeg,image/gif,image/png'
          /><br />

          <img
            style={{ width: 150, height: 150 }}
            src={imgSrc === '' ? data?.hinhAnh : imgSrc}
            alt='...'
          />
        </Form.Item>

        <Form.Item label='Thao tác'>
          <button
            type='submit'
            className='button-submit-edit'
          >
            Cập nhật
          </button>
        </Form.Item>
      </Form>
    </Fragment>
  );
};

export default EditFilm;



