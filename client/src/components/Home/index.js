import React, { Component } from "react";
import HomeSlider from "./HomeSlider";
import CardLine from "../utils/cardLine";
import {
  getProductsByArrival,
  getProductsBySell
} from "../../Store/Actions/productsAction";
import { connect } from "react-redux";

class Home extends Component {
  componentDidMount() {
    this.props.dispatch(getProductsBySell());
    this.props.dispatch(getProductsByArrival());
  }

  render() {
    return (
      <div>
        <HomeSlider />
        <CardLine
          list={this.props.products.bySell}
          title="Best Selling guitars"
        />
        <CardLine list={this.props.products.byArraival} title="New arrivals" />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    products: state.products
  };
};

export default connect(mapStateToProps)(Home);
