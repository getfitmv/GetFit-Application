import React, { Component } from "react";
import PageHeader from "../../components/utils/PageHeader";
import { connect } from "react-redux";
import {
  getTrainerProducts,
  getCatgs,
  getGends
} from "../../Store/Actions/productsAction";
import CheckboxCollabse from "../utils/CheckboxCollabse";
import RadioCollabse from "../utils/RadioCollabse";
import { price } from "../utils/Form/FixedCatgs";
import LoadCards from "./loadCards";

import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faBars from "@fortawesome/fontawesome-free-solid/faBars";
import faTh from "@fortawesome/fontawesome-free-solid/faTh";

class ShopTrainer extends Component {
  state = {
    grid: "",
    limit: 6,
    skip: 0,
    filters: {
      catg: [],
      gend: [],
      price: []
    }
  };

  componentDidMount() {
    this.props.dispatch(getCatgs());
    this.props.dispatch(getGends());

    this.props.dispatch(
      getTrainerProducts(this.state.skip, this.state.limit, this.state.filters)
    );
  }

  handlePrice = value => {
    const data = price;
    let array = [];

    for (let key in data) {
      if (data[key]._id === parseInt(value, 10)) {
        array = data[key].array;
      }
    }
    return array;
  };

  filterHandler = (filters, category) => {
    const newFilters = { ...this.state.filters };
    newFilters[category] = filters;

    if (category === "price") {
      let priceValues = this.handlePrice(filters);
      newFilters[category] = priceValues;
    }

    this.showFilteredResults(newFilters);
    this.setState({
      filters: newFilters
    });
  };

  showFilteredResults = filters => {
    this.props
      .dispatch(getTrainerProducts(0, this.state.limit, filters))
      .then(() => {
        this.setState({
          skip: 0
        });
      });
  };

  loadMore = () => {
    let skip = this.state.skip + this.state.limit;

    this.props
      .dispatch(
        getTrainerProducts(
          skip,
          this.state.limit,
          this.state.filters,
          this.props.products.toShop
        )
      )
      .then(() => {
        this.setState({
          skip
        });
      });
  };

  handleGrid = () => {
    this.setState({
      grid: !this.state.grid ? "grid_bars" : ""
    });
  };

  render() {
    const products = this.props.products;
    return (
      <div>
        <PageHeader title="Browse Products" />
        <div className="container">
          <div className="shop_wrapper">
            <div className="left">
              <CheckboxCollabse
                initState={true}
                title="category"
                list={products.catgs}
                filterHandler={filters => this.filterHandler(filters, "catg")}
              />
              <RadioCollabse
                initState={false}
                title="Gender"
                list={products.gends}
                filterHandler={filters => this.filterHandler(filters, "gend")}
              />
              <RadioCollabse
                initState={false}
                title="Price"
                list={price}
                filterHandler={filters => this.filterHandler(filters, "price")}
              />
            </div>
            <div className="right">
              <div className="shop_options">
                <div className="shop_grids clear">
                  <div
                    className={`grid_btn ${this.state.grid ? "" : "active"}`}
                    onClick={() => this.handleGrid()}
                  >
                    <FontAwesomeIcon icon={faTh} />
                  </div>
                  <div
                    className={`grid_btn ${!this.state.grid ? "" : "active"}`}
                    onClick={() => this.handleGrid()}
                  >
                    <FontAwesomeIcon icon={faBars} />
                  </div>
                </div>
              </div>
              <div style={{ clear: "both" }}>
                <LoadCards
                  grid={this.state.grid}
                  limit={this.state.limit}
                  size={products.toSize}
                  products={products.toShop}
                  loadMore={() => this.loadMore()}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    products: state.products
  };
};

export default connect(mapStateToProps)(ShopTrainer);
