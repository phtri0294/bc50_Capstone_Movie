import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";
import { actFetchLichChieu } from "./duck/actions";
import { connect } from "react-redux";
import moment from "moment/moment";
import { Tabs, Tab, TabList, TabPanel } from "react-tabs";
export default function GetLich() {
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.listLichChieuReducer);
  useEffect(() => dispatch(actFetchLichChieu()), []);
  return (
    <section className="lich-section">
      <Tabs className="tab-level-1">
        <TabList>
          {data?.map((tenRap, key) => {
            return (
              <Tab>
                <img src={tenRap?.logo} width={64} height={64}></img>
              </Tab>
            );
          })}
        </TabList>

        {data?.map((tenRap, key) => {
          return (
            <TabPanel>
              <Tabs className="tab-level-2">
                <TabList>
                  {tenRap?.lstCumRap.map((cumRap, key) => {
                    return (
                      <Tab>
                        {" "}
                        <div className="rap">
                          <h3 className="rap-name" key={key}>
                            {cumRap.tenCumRap}
                          </h3>
                          <p className="rap-diachi">{cumRap.diaChi}</p>
                        </div>
                      </Tab>
                    );
                  })}
                </TabList>
                {tenRap?.lstCumRap.map((cumRap, key) => {
                  return (
                    <TabPanel>
                      {cumRap?.danhSachPhim.map((phim, key) => {
                        return (
                          <div className="phim">
                            <div className="phim-desc">
                              <img
                                src={phim.hinhAnh}
                                width={100}
                                height={126}
                              />
                              <div className="phim-title">
                                <h4 className="phim-title-name">
                                  {phim.hot ? (
                                    <span className="phim-tags-hot">Hot</span>
                                  ) : (
                                    ""
                                  )}
                                  {phim.tenPhim}
                                </h4>
                                <div className="phim-tags">
                                  {phim.dangChieu ? (
                                    <span className="phim-tags-progress">
                                      Phim Đang Chiếu
                                    </span>
                                  ) : (
                                    ""
                                  )}
                                  {phim.sapChieu ? (
                                    <span className="phim-tags-upcoming">
                                      Phim Sắp Chiếu
                                    </span>
                                  ) : (
                                    ""
                                  )}
                                </div>
                              </div>
                            </div>

                            <div className="phim-calendar">
                              <p>Thời gian chiếu: </p>
                              <ul className>
                                {phim?.lstLichChieuTheoPhim.map(
                                  (lichChieu, key) => {
                                    return (
                                      <li key={key}>
                                        <a
                                          href={`/phongve/${lichChieu.maLichChieu}`}
                                        >
                                          <p>
                                            {moment(
                                              lichChieu.ngayChieuGioChieu
                                            ).format("MM/DD/YYYY ~ (HH:mm)")}
                                          </p>
                                        </a>
                                      </li>
                                    );
                                  }
                                )}
                              </ul>
                            </div>
                          </div>
                        );
                      })}
                    </TabPanel>
                  );
                })}
              </Tabs>
            </TabPanel>
          );
        })}
      </Tabs>
    </section>
  );
}
