import { GET_SITE_INFO, MODIFY_SITE_INFO } from "../Actions/types";

export default function(state = {}, action) {
  switch (action.type) {
    case GET_SITE_INFO:
      return { ...state, siteInfo: action.payload };
    case MODIFY_SITE_INFO:
      return { ...state, siteInfo: action.payload.siteInfo };
    default:
      return state;
  }
}
