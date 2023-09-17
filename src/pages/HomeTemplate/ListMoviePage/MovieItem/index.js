import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class MovieItem extends Component {
  render() {
    const { movie } = this.props;
    return (
      <div className="col-md-3 main-page">
        <div className="card">
          <img className="card-img-top" src={movie.hinhAnh} alt="" />
          <div className="card-body">
            <h4 className="card-title">{movie.tenPhim}</h4>
            <p className="card-detail">{movie.moTa}</p>
            <Link to={`/detail/${movie.maPhim}`} className="btn btn-success btn-movie">
              Xem Thêm Chi Tiết
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
