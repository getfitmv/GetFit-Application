import React from "react";
import moment from "moment";

const PurchaseHistory = props => {
  const generateHistory = () =>
    props.history
      ? props.history.map((product, i) => (
          <tr key={i}>
            <th>{moment(product.dateOfPurchase).format("MM-DD-YYYY")}</th>
            <th>{product.name}</th>
            <th>{product.price}</th>
            <th>{product.quantity}</th>
          </tr>
        ))
      : null;

  return (
    <div className="history_blocks">
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>{generateHistory()}</tbody>
      </table>
    </div>
  );
};

export default PurchaseHistory;
