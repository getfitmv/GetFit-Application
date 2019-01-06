import React, { Component } from "react";
import UserLayout from "../../hoc/userLayout";
import { connect } from "react-redux";
import {
  cartItem,
  cartRemoveItem,
  successPurchase
} from "../../Store/Actions/userAction";
import CartBlock from "../utils/cartBlock";

import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faFrown from "@fortawesome/fontawesome-free-solid/faFrown";
import faSmile from "@fortawesome/fontawesome-free-solid/faSmile";
import Paypal from "../utils/paypal";
/**
|--------------------------------------------------
| AfybCDNvsXgDWCc80PuE8Q6hUVCJWI4HKNqrzFGnNIIw62iZM9uoAiMXnsf4ZfBXaMjBMJ0hHpn-5Pqt
|--------------------------------------------------
*/

class CartUser extends Component {
  state = {
    loading: true,
    totalPrice: 0,
    showTotal: false,
    showSuccess: false
  };

  componentDidMount() {
    let cartItems = [];
    let user = this.props.user;
    if (user.userData.cart) {
      if (user.userData.cart.length > 0) {
        user.userData.cart.forEach(item => {
          cartItems.push(item.id);
        });

        this.props
          .dispatch(cartItem(cartItems, user.userData.cart))
          .then(() => {
            if (this.props.user.cartDetail.length > 0) {
              this.calculatePrice(this.props.user.cartDetail);
            }
          });
      }
    }
  }

  calculatePrice = cartDetail => {
    let totalPrice = 0;

    cartDetail.forEach(item => {
      totalPrice += parseInt(item.price, 10) * item.quantity;
    });

    this.setState({
      totalPrice,
      showTotal: true
    });
  };

  showNoItems = () => (
    <div className="cart_no_items">
      <FontAwesomeIcon icon={faFrown} />
      <div>No Items</div>
    </div>
  );

  removeItemCart = id => {
    this.props.dispatch(cartRemoveItem(id)).then(() => {
      if (this.props.user.cartDetail.length <= 0) {
        this.setState({
          showTotal: false
        });
      } else {
        this.calculatePrice(this.props.user.cartDetail);
      }
    });
  };

  transctionError = error => {
    console.log("paypal error");
  };

  transCanceled = data => {
    console.log("tranction canceld");
  };

  transCompleted = data => {
    this.props
      .dispatch(
        successPurchase({
          cartDetail: this.props.user.cartDetail,
          paymentData: data
        })
      )
      .then(() => {
        if (this.props.user.successBuy) {
          this.setState({
            showTotal: false,
            showSuccess: true
          });
        }
      });
  };

  render() {
    return (
      <UserLayout>
        <div>
          <h1>My Cart</h1>
          <div className="user_cart">
            <CartBlock
              products={this.props.user}
              type="cart"
              removeItem={id => this.removeItemCart(id)}
            />

            {this.state.showTotal ? (
              <div className="user_cart_sum">
                <div>Total Amount: $ {this.state.totalPrice}</div>
              </div>
            ) : this.state.showSuccess ? (
              <div className="cart_no_items">
                <FontAwesomeIcon icon={faSmile} />
                <div>Thank you</div>
              </div>
            ) : (
              this.showNoItems()
            )}
          </div>

          {this.state.showTotal ? (
            <div className="paypal_button_container">
              <div className="paypal_button_container">
                <Paypal
                  amountToPay={this.state.totalPrice}
                  onError={error => this.transctionError(error)}
                  onCancel={data => this.transCanceled(data)}
                  onSuccess={data => this.transCompleted(data)}
                />
              </div>
            </div>
          ) : null}
        </div>
      </UserLayout>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps)(CartUser);
