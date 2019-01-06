import React from "react";

import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faExclamationCircle from "@fortawesome/fontawesome-free-solid/faExclamationCircle";

const PageNotFound = () => {
  return (
    <div className="container">
      <div className="not_found_container">
        <FontAwesomeIcon icon={faExclamationCircle} />
        <div>
          <h1>page not found</h1>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
