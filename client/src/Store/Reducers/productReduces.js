import {
  GET_PRODUCTS_BY_ARRIVAL,
  GET_PRODUCTS_BY_SELL,
  GET_CATGS,
  ADD_CATG,
  GET_GENDS,
  CLEAR_CATG,
  ADD_GEND,
  CLEAR_GEND,
  GET_TRAINERS_PRODUCTS,
  ADD_PRODUCT,
  CLEAR_PRODUCT,
  GET_PRODUCT_ID,
  CLEAR_PRODUCT_ID
} from "../Actions/types";

export default function(state = {}, action) {
  switch (action.type) {
    case GET_PRODUCTS_BY_ARRIVAL:
      return { ...state, byArraival: action.payload };
    case GET_PRODUCTS_BY_SELL:
      return { ...state, bySell: action.payload };
    case GET_CATGS:
      return { ...state, catgs: action.payload };
    case GET_GENDS:
      return { ...state, gends: action.payload };
    case GET_TRAINERS_PRODUCTS:
      return {
        ...state,
        toShop: action.payload.trainers,
        toSize: action.payload.size
      };
    case ADD_PRODUCT:
      return { ...state, addProduct: action.payload };
    case CLEAR_PRODUCT:
      return { ...state, addProduct: action.payload };
    case ADD_CATG:
      return {
        ...state,
        addCatg: action.payload.success,
        catgs: action.payload.catgs
      };

    case ADD_GEND:
      return {
        ...state,
        addGend: action.payload.success,
        gends: action.payload.gends
      };
    case CLEAR_CATG:
      return { ...state, addCatg: action.payload };
    case CLEAR_GEND:
      return { ...state, addGend: action.payload };
    case GET_PRODUCT_ID:
      return { ...state, prodData: action.payload };
    case CLEAR_PRODUCT_ID:
      return { ...state, prodData: action.payload };
    default:
      return state;
  }
}
