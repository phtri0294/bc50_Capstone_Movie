import React, { Fragment, useEffect, useState } from 'react'
import { useFormik } from 'formik';
import moment from 'moment';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
    Form,
    Select,
    DatePicker,
    InputNumber
} from 'antd';

import {
    actManageCinema,
    actDetailCinema,
    actAddNewCalendar
} from './duck/actions';
import { actDetailFilm } from '../EditFilm/duck/actions';

function ShowTime() {
    const { id, name } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const dataImg = useSelector((state) => state.detailFilmReducer.data);
    const cinema = useSelector((state) => state.infoShowTimeReducer.cinema);
    const detailCinema = useSelector((state) => state.infoShowTimeReducer.detailCinema);
    const [componentSize, setComponentSize] = useState('default');
    const [imgSrc] = useState('');

    useEffect(() => {
        dispatch(actDetailFilm(id));
        dispatch(actManageCinema());
    }, []);

    const formik = useFormik({
        initialValues: {
            maPhim: id,
            ngayChieuGioChieu: '',
            maRap: '',
            giaVe: '',
        },

        onSubmit: (values) => {
            dispatch(actAddNewCalendar(values, navigate));
        }
    });

    const convertSelectCinema = () => {
        return cinema?.map((item) => {
            return { label: item.tenHeThongRap, value: item.maHeThongRap };
        });
    };

    const convertSelectDetailCinema = () => {
        return detailCinema?.map((item) => {
            return { label: item.tenCumRap, value: item.maCumRap }
        });
    };

    const handleChangeCinema = (values) => {
        formik.setFieldValue('heThongRap', values);
        dispatch(actDetailCinema(values));
    };

    const handleChangeDetailCinema = (values) => {
        formik.setFieldValue('maRap', values)
    };

    const onFormLayoutChange = ({ size }) => {
        setComponentSize(size);
    };

    const onOk = (values) => {
        formik.setFieldValue('ngayChieuGioChieu', moment(values).format('DD/MM/YYYY hh:mm:ss'));
    };

    const onChangeDate = (values) => {
        formik.setFieldValue('ngayChieuGioChieu', moment(values).format('DD/MM/YYYY hh:mm:ss'));
    };

    const onchangeInputNumber = (value) => {
        formik.setFieldValue('giaVe', value);
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
                    className='heading-page text-purple-700'>
                    TẠO LỊCH CHIẾU
                </div>
                <hr className='h-divider mb-4' />

                <h3 className='text-2xl text-center'>{name}</h3>
                <div className='flex justify-center my-4' >
                    <img
                        style={{ width: 300, height: 300 }}
                        src={imgSrc === '' ? dataImg?.hinhAnh : imgSrc}
                        alt='...'
                    />
                </div>

                <Form.Item
                    label='Hệ thống rạp'
                >
                    <Select
                        placeholder="Chọn hệ thống rạp"
                        onChange={handleChangeCinema}
                        options={convertSelectCinema()}
                    />
                </Form.Item>

                <Form.Item
                    label='Cụm rạp'
                >
                    <Select
                        placeholder="Chọn cụm rạp"
                        onChange={handleChangeDetailCinema}
                        options={convertSelectDetailCinema()}
                    />
                </Form.Item>

                <Form.Item
                    label='Ngày chiếu giờ chiếu'
                >
                    <DatePicker
                        showTime
                        onChange={onChangeDate}
                        onOk={onOk}
                    />
                </Form.Item>

                <Form.Item
                    label='Giá vé'
                >
                    <InputNumber
                        min={75000}
                        max={200000}
                        onChange={onchangeInputNumber}
                    />
                </Form.Item>

                <Form.Item
                    label='Thao tác'
                >
                    <button
                        type='submit'
                        className='button-submit-setnew'
                    >
                        Tạo lịch chiếu
                    </button>
                </Form.Item>
            </Form>
        </Fragment>
    );
};

export default ShowTime;