import axios from "axios";
import { GET_SITE_INFO, MODIFY_SITE_INFO } from "./types";
import { SITE_SERVER } from "../../components/utils/misc";

export const getSiteInfo = () => {
  const request = axios
    .get(`${SITE_SERVER}/site_data`) //refer to api address
    .then(response => response.data);

  return {
    type: GET_SITE_INFO,
    payload: request
  };
};

export const updateSiteInfo = dataToSubmit => {
  const request = axios
    .post(`${SITE_SERVER}/site_data`, dataToSubmit)
    .then(response => response.data);

  return {
    type: MODIFY_SITE_INFO,
    payload: request
  };
};
