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
} from "../Actions/types";

export default function(state = {}, action) {
  switch (action.type) {
    case REGISTER_USER:
      return { ...state, register: action.payload };
    case LOGIN_USER:
      return { ...state, loginSucces: action.payload };
    case AUTH_USER:
      return { ...state, userData: action.payload };
    case LOGOUT_USER:
      return { ...state };
    case ADD_TO_CART:
      return {
        ...state,
        userData: {
          ...state.userData,
          cart: action.payload
        }
      };

    case GET_CARD_ITEM:
      return { ...state, cartDetail: action.payload };
    case RM_CART_ITEM:
      return {
        ...state,
        cartDetail: action.payload.cartDetail,
        userData: {
          ...state.userData,
          cart: action.payload.cart
        }
      };

    case ON_SUCCESS_PURCHASE:
      return {
        ...state,
        successBuy: action.payload.success,
        userData: {
          ...state.userData,
          cart: action.payload.cart
        },
        cartDetail: action.payload.cartDetail
      };

    case UPDATE_PROFILE:
      return { ...state, updateProfile: action.payload };
    case CLEAR_UPDATE_FEILDS:
      return { ...state, updateProfile: action.payload };

    default:
      return state;
  }
}
