import axios from "axios";
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
} from "./types";
import { PRODUCT_SERVER } from "../../components/utils/misc";
import { request } from "https";

export const getProductId = id => {
  const request = axios
    .get(`${PRODUCT_SERVER}/productid?id=${id}&type=single`)
    .then(response => {
      return response.data[0];
    });

  return {
    type: GET_PRODUCT_ID,
    payload: request
  };
};

export function getProductsByArrival() {
  const requset = axios
    .get(`${PRODUCT_SERVER}/list_product?sortBy=createdAt&order=desc&limit=4`)
    .then(response => response.data);

  return {
    type: GET_PRODUCTS_BY_ARRIVAL,
    payload: requset
  };
}

export function getProductsBySell() {
  const requset = axios
    .get(`${PRODUCT_SERVER}/list_product?sortBy=sold&order=desc&limit=4`)
    .then(response => response.data);

  return {
    type: GET_PRODUCTS_BY_SELL,
    payload: requset
  };
}

export const getTrainerProducts = (
  skip,
  limit,
  filters = [],
  previousState = []
) => {
  const data = {
    limit,
    skip,
    filters
  };

  const request = axios
    .post(`${PRODUCT_SERVER}/trainer`, data)
    .then(response => {
      let newState = [...previousState, ...response.data.trainers];
      return {
        size: response.data.size,
        trainers: newState
      };
    });
  return {
    type: GET_TRAINERS_PRODUCTS,
    payload: request
  };
};

export const addProduct = datatoSubmit => {
  const request = axios
    .post(`${PRODUCT_SERVER}/create`, datatoSubmit)
    .then(response => response.data);

  return {
    type: ADD_PRODUCT,
    payload: request
  };
};

export const clearProduct = () => {
  return {
    type: CLEAR_PRODUCT,
    payload: ""
  };
};

export const clearProductId = () => {
  return {
    type: CLEAR_PRODUCT_ID,
    payload: ""
  };
};

//------------------------------
//          FILTERS
//------------------------------

export const getCatgs = () => {
  const request = axios
    .get(`${PRODUCT_SERVER}/catgs`)
    .then(response => response.data);

  return {
    type: GET_CATGS,
    payload: request
  };
};

export const getGends = () => {
  const request = axios
    .get(`${PRODUCT_SERVER}/gends`)
    .then(response => response.data);

  return {
    type: GET_GENDS,
    payload: request
  };
};

//==================================
//         ADDING CATGEORIES
//==================================

export const addCatg = (dataToSubmit, existingCatgs) => {
  const request = axios
    .post(`${PRODUCT_SERVER}/catg`, dataToSubmit)
    .then(response => {
      let catgs = [...existingCatgs, response.data.catg];

      return {
        success: response.data.success,
        catgs
      };
    });

  return {
    type: ADD_CATG,
    payload: request
  };
};

export const clearCatg = () => {
  return {
    type: CLEAR_CATG,
    payload: ""
  };
};

export const addGend = (dataToSubmit, existingGends) => {
  const request = axios
    .post(`${PRODUCT_SERVER}/gend`, dataToSubmit)
    .then(response => {
      let gends = [...existingGends, response.data.gend];

      return {
        success: response.data.success,
        gends
      };
    });

  return {
    type: ADD_GEND,
    payload: request
  };
};

export const clearGend = () => {
  return {
    type: CLEAR_GEND,
    payload: ""
  };
};
