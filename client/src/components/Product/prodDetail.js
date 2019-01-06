import React from "react";
import MyButton from "../utils/button";

import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faTruck from "@fortawesome/fontawesome-free-solid/faTruck";
import faCheck from "@fortawesome/fontawesome-free-solid/faCheck";
import faTimes from "@fortawesome/fontawesome-free-solid/faTimes";

const ProdDetail = props => {
  const info = props.info;

  const prodAction = info => (
    <div className="product_actions">
      <div className="price">${info.price}</div>
      <div className="cart">
        <MyButton
          type="add_to_cart_link"
          runAction={() => {
            props.addToCart(info._id);
          }}
        />
      </div>
    </div>
  );

  const showSpec = info => (
    <div className="product_specifications">
      <h2>spec</h2>

      <div className="item">
        <strong>Gender:</strong>
        {info.gend.name}
      </div>
    </div>
  );

  return (
    <div>
      <h1>{info.name}</h1>
      <h2>{info.catg.name}</h2>
      <p>{info.description}</p>

      {prodAction(info)}
      {showSpec(info)}
    </div>
  );
};

export default ProdDetail;
