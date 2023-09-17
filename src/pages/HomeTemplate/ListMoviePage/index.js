import React, { Component } from "react";
import MovieItem from "./MovieItem";
import GetLich from "../_components/GetLich";
import Banner from "../_components/Banner";
import { actFetchListMovie } from "./duck/actions";
import { connect } from "react-redux";
import Loader from "components/Loader";
class ListMoviePage extends Component {
  componentDidMount() {
    this.props.fetchListMovie();
  }

  renderListMovie = () => {
    const { data, loading } = this.props;
    if (loading) return <Loader />;
    return data?.map((movie) => <MovieItem key={movie.maPhim} movie={movie} />);
  };

  render() {
    return (
      <>
        <Banner />
        <div className="container">
          <div className="row">{this.renderListMovie()}</div>
          <GetLich />
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.listMovieReducer.loading,
    data: state.listMovieReducer.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchListMovie: () => {
      dispatch(actFetchListMovie());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListMoviePage);
