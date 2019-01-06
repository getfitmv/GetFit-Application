import React from "react";
import CardShop from "../utils/cardShop";

const LoadCards = props => {
  return (
    <div>
      <div>
        <CardShop grid={props.grid} list={props.products} />
      </div>
      {props.size > 0 && props.size >= props.limit ? (
        <div className="load_more_container">
          <span onClick={() => props.loadMore()}>Load More</span>
        </div>
      ) : null}
    </div>
  );
};

export default LoadCards;
