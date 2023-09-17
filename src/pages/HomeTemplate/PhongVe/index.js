import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";
import {
  actFetchPhongVe,
  actGetSeat,
  actRemoveSeat,
} from "../../bak/HomeTemplate/PhongVe/duck/actions";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import Loader from "components/Loader";
import UserPrompt from "components/UserPrompt";

export default function PhongVe() {
  const params = useParams();
  const dispatch = useDispatch();

  const { data, loading } = useSelector((state) => state.listPhongVeReducer);
  const { checked, isChecked } = useState(false);
  const [prompt, setPrompt] = useState(false);
  useEffect(() => dispatch(actFetchPhongVe(params.id)), []);

  const handleChange = (event) => {
    const seat = event.target.value;

    if (event.target.checked) {
      console.log(`✅ ${event.target.name} is checked`);
    } else {
      console.log(`⛔️ ${event.target.name} is NOT checked`);
    }

    if (event.target.checked === true) {
      dispatch(actGetSeat(seat));
    } else {
      dispatch(actRemoveSeat(seat));
    }
    // setIsSubscribed((current) => !current);
  };

  const danhSachGhe = data?.danhSachGhe;
  const thongTinPhim = data?.thongTinPhim;
  const chunkSize = 16;

  const chunkedGhe = [];
  if (danhSachGhe !== undefined) {
    for (let i = 0; i < danhSachGhe.length; i += chunkSize) {
      chunkedGhe.push(danhSachGhe.slice(i, i + chunkSize));
    }
  }

  const orderList = useSelector((state) => state.listPhongVeReducer.orderList);
  let giaVe = 0;
  if (orderList) {
    orderList?.map((order, key) => {
      return (giaVe = giaVe + Number(order.giaVe));
    });
  }

  const imgSrc = thongTinPhim?.hinhAnh;

  const bg = {
    backgroundImage: `url(${imgSrc})`,
    overflow: "hidden",
  };

  const handleBuy = () => {
    return setPrompt(true);
  };

  if (loading) return <Loader />;
  return (
    <>
      {prompt && <UserPrompt />}
      <section className="phongve-section" style={bg}>
        <div className="container">
          <div className="detail-phim-box" style={{ display: "flex" }}>
            <div>
              <img width={250} src={data && thongTinPhim?.hinhAnh} />
              <button
                className="btn btn-success btn-buy"
                disabled={orderList?.length > 0 ? false : true}
                onClick={handleBuy}
              >
                Mua Vé
              </button>
            </div>
            <table className="table">
              <tbody>
                <tr>
                  <td>Tên Phim</td>
                  <td>{thongTinPhim?.tenPhim}</td>
                </tr>
                <tr>
                  <td>Thời gian: </td>
                  <td>
                    {thongTinPhim?.ngayChieu} - ({thongTinPhim?.gioChieu})
                  </td>
                </tr>

                <tr>
                  <td>Tên cụm rạp: </td>
                  <td>{thongTinPhim?.tenRap}</td>
                </tr>

                <tr>
                  <td>Tên Rạp: </td>
                  <td>{thongTinPhim?.tenCumRap}</td>
                </tr>

                <tr>
                  <td>Địa Chỉ: </td>
                  <td>{thongTinPhim?.diaChi}</td>
                </tr>

                <tr>
                  <td>Chọn: </td>
                  <td>
                    {orderList?.map((order, key) => {
                      return (
                        <>
                          <span> Ghế {order?.tenGhe},</span>
                        </>
                      );
                    })}
                  </td>
                </tr>
                <tr>
                  <td>Giá Vé: </td>
                  <td>{giaVe} VND</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="select-seat">
            <div className="w3ls-reg">
              <ul className="template-seats">
                <li className="cat">
                  <label className="example">
                    {" "}
                    <input
                      type="checkbox"
                      className="seats"
                      value="Ghế đã chọn"
                      disabled="true"
                    />
                    <span>"Ghế đã chọn"</span>
                  </label>
                </li>
                <li className="cat">
                  {" "}
                  <label className="example">
                    {" "}
                    <input
                      type="checkbox"
                      className="seats"
                      value="Ghế chưa chọn"
                    />
                    <span>"Ghế chưa chọn"</span>
                  </label>
                </li>
                <li className="cat">
                  {" "}
                  <label className="example vip">
                    {" "}
                    <input
                      type="checkbox"
                      className="seats"
                      value="Ghế chưa chọn"
                    />
                    <span>"Ghế VIP chưa chọn"</span>
                  </label>
                </li>
              </ul>
              {/* seat availabilty list */}
              {/* seat layout */}
              <div
                className="seatStructure txt-center"
                style={{ overflowX: "auto" }}
              >
                {" "}
                <div className="screen">
                  <p id="notification">
                    <h2
                      style={{
                        marginBottom: 0,
                        background: "#ff9800",
                        letterSpacing: 1,
                        padding: "20px",
                        color: "#fff",
                        marginBottom: "30px",
                      }}
                    >
                      MÀN HÌNH CHÍNH
                    </h2>
                  </p>
                </div>
                <table id="seatsBlock">
                  <tbody>
                    {chunkedGhe.map((chunk, rowIndex) => (
                      <ul className="seat-list">
                        {chunk.map((chair) => {
                          const value = JSON.stringify(chair);
                          return (
                            <li className="cat">
                              <label
                                className={chair.loaiGhe === "Vip" ? "vip" : ""}
                                style={{ marginBottom: "0px" }}
                              >
                                <input
                                  name={`seat ${chair.tenGhe}`}
                                  type="checkbox"
                                  className={"seats"}
                                  value={value}
                                  disabled={chair.daDat}
                                  onClick={handleChange}
                                  checked={checked}
                                />
                                <span>{chair.tenGhe}</span>
                              </label>
                            </li>
                          );
                        })}
                      </ul>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* //seat layout */}
              {/* details after booking displayed here */}
              <div
                className="displayerBoxes txt-center"
                style={{ overflowX: "auto" }}
              >
                {/* <Orders /> */}
              </div>
              {/* //details after booking displayed here */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
