import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { actFetchDetailMovie } from "./duck/actions";
import { useSelector, useDispatch } from "react-redux";
import Loader from "components/Loader";
import moment from "moment/moment";
import { Tabs, Tab, TabList, TabPanel } from "react-tabs";
function DetailMoviePage(props) {
  const params = useParams();
  const loading = useSelector((state) => state.detailMovieReducer.loading);
  const data = useSelector((state) => state.detailMovieReducer.data);
  const dispatch = useDispatch();

  useEffect(() => {
    // props.fecthData(params.id);
    dispatch(actFetchDetailMovie(params.id));
  }, []);

  if (loading) return <Loader />;

  const bg = {
    background: `url(${data && data.hinhAnh})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    overflow: "hidden",
  };

  const youtubeUrl = data && data?.trailer;
  // Use a regular expression to extract the video ID
  const match = youtubeUrl?.match(/[?&]v=([^&]+)/);
  const videoCode = match != null ? match[1] : "";
  return (
    <div className="detail-main" style={bg}>
      <div className="detail-phim container">
        <div className="detail-phim-box" style={{ display: "flex" }}>
          <div>
            <img src={data && data.hinhAnh} />
          </div>
          <table className="table">
            <tbody>
              <tr>
                <td>Tên Phim</td>
                <td>{data && data.tenPhim}</td>
              </tr>
              <tr>
                <td>Mô tả</td>
                <td>{data && data.moTa}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <iframe
          width="100%"
          height="600px"
          src={`https://www.youtube.com/embed/${videoCode}`}
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
      </div>
      <section className="lich-section">
        <div className="container">
          <Tabs className="tab-level-1">
            <TabList>
              {" "}
              {data &&
                data?.heThongRapChieu.map((rap, key) => {
                  return (
                    <Tab>
                      <img src={rap.logo} width={64} height={64} />
                    </Tab>
                  );
                })}
            </TabList>

            {data &&
              data?.heThongRapChieu.map((rap, key) => {
                return (
                  <TabPanel className="tab-lichchieu">
                    {rap.cumRapChieu.map((cumRap, key) => {
                      return (
                        <>
                          <div className="rap">
                            {" "}
                            <h3 className="rap-name" key={key}>
                              {cumRap.tenCumRap}
                            </h3>
                          </div>

                          <div className="phim-calendar">
                            <p>Thời gian chiếu</p>
                            <ul>
                              {cumRap?.lichChieuPhim.map((lichChieu, key) => {
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
                              })}
                            </ul>
                          </div>
                        </>
                      );
                    })}
                  </TabPanel>
                );
              })}
          </Tabs>
        </div>
      </section>
    </div>
  );
}

export default DetailMoviePage;

// const mapStateToProps = (state) => {
//   return {
//     loading: state.detailMovieReducer.loading,
//     data: state.detailMovieReducer.data,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     fecthData: (id) => {
//       dispatch(actFetchDetailMovie(id));
//     },
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(DetailMoviePage);
