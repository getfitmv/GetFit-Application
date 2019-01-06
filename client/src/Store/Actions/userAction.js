import axios from "axios";
import {
  LOGIN_USER,
  REGISTER_USER,
  AUTH_USER,
  LOGOUT_USER,
  ADD_TO_CART,
  GET_CARD_ITEM,
  RM_CART_ITEM,
  ON_SUCCESS_PURCHASE,
  UPDATE_PROFILE,
  CLEAR_UPDATE_FEILDS
} from "./types";
import { USER_SERVER, PRODUCT_SERVER } from "../../components/utils/misc";

export function registerUser(dataToSubmit) {
  const request = axios
    .post(`${USER_SERVER}/register`, dataToSubmit)
    .then(response => response.data);

  return {
    type: REGISTER_USER,
    payload: request
  };
}

export function loginUser(dataToSubmit) {
  const request = axios
    .post(`${USER_SERVER}/login`, dataToSubmit)
    .then(response => response.data);

  return {
    type: LOGIN_USER,
    payload: request
  };
}

export function auth() {
  const request = axios
    .get(`${USER_SERVER}/auth`)
    .then(response => response.data);

  return {
    type: AUTH_USER,
    payload: request
  };
}

export function logoutUser() {
  const request = axios
    .get(`${USER_SERVER}/logout`)
    .then(response => response.data);

  return {
    type: LOGOUT_USER,
    payload: request
  };
}

export const successPurchase = data => {
  const request = axios
    .post(`${USER_SERVER}/successBuy`, data)
    .then(response => response.data);

  return {
    type: ON_SUCCESS_PURCHASE,
    payload: request
  };
};

export const updateProfile = dataToSubmit => {
  const request = axios
    .post(`${USER_SERVER}/updateprofile`, dataToSubmit)
    .then(response => response.data);

  return {
    type: UPDATE_PROFILE,
    payload: request
  };
};

export const clearProfileFields = () => {
  return {
    type: CLEAR_UPDATE_FEILDS,
    payload: ""
  };
};
/**
|--------------------------------------------------
|                 CART 
|--------------------------------------------------
*/

export const addToCart = _id => {
  const request = axios
    .post(`${USER_SERVER}/addtocart?productId=${_id}`)
    .then(response => response.data);

  return {
    type: ADD_TO_CART,
    payload: request
  };
};

export const cartItem = (cartItems, userCart) => {
  const request = axios
    .get(`${PRODUCT_SERVER}/productid?id=${cartItems}&type=array`)
    .then(response => {
      userCart.forEach(item => {
        response.data.forEach((q, i) => {
          if (item.id === q._id) {
            response.data[i].quantity = item.quantity;
          }
        });
      });
      return response.data;
    });

  return {
    type: GET_CARD_ITEM,
    payload: request
  };
};

export const cartRemoveItem = id => {
  const request = axios
    .get(`${USER_SERVER}/removeitem?_id=${id}`)
    .then(response => {
      response.data.cart.forEach(item => {
        response.data.cartDetail.forEach((q, i) => {
          if (item.id === q._id) {
            response.data.cartDetail[i].quantity = item.quantity;
          }
        });
      });

      return response.data;
    });

  return {
    type: RM_CART_ITEM,
    payload: request
  };
};
