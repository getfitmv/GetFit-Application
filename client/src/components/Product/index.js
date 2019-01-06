import React, { Component } from "react";
import PageHeader from "../utils/PageHeader";
import { connect } from "react-redux";
import {
  clearProductId,
  getProductId
} from "../../Store/Actions/productsAction";

import ProdDetail from "./prodDetail";
import ProdImg from "./prodImg";
import { addToCart } from "../../Store/Actions/userAction";

class ProductPage extends Component {
  componentDidMount() {
    const id = this.props.match.params.id;

    this.props.dispatch(getProductId(id)).then(response => {
      if (!this.props.products.prodData) {
        console.log("no product found");
      }
    });
  }

  addToCart = id => {
    this.props.dispatch(addToCart(id));
  };

  componentWillMount = () => {
    this.props.dispatch(clearProductId());
  };

  render() {
    return (
      <div>
        <PageHeader title="Product Detail" />
        <div className="container">
          {this.props.products.prodData ? (
            <div className="product_detail_wrapper">
              <div className="left">
                <div style={{ width: "500px" }}>
                  <ProdImg info={this.props.products.prodData} />
                </div>
              </div>
              <div className="right">
                <ProdDetail
                  addToCart={id => this.addToCart(id)}
                  info={this.props.products.prodData}
                />
              </div>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    products: state.products,
    user: state.user
  };
};

export default connect(mapStateToProps)(ProductPage);
