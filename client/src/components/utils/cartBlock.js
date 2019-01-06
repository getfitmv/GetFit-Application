import React from "react";

const CartBlock = ({ products, removeItem }) => {
  const imageCart = images => {
    if (images.length > 0) {
      return images[0].url;
    } else {
      return "/images/image-available-soon.jpg";
    }
  };

  const showItem = () =>
    products.cartDetail
      ? products.cartDetail.map(product => (
          <div className="user_product_block" key={product._id}>
            <div className="item">
              <div
                className="image"
                style={{
                  background: `url(${imageCart(product.images)}) no-repeat`
                }}
              />
            </div>
            <div className="item">
              <h4>product name</h4>
              {product.name} {product.gend.name}
            </div>
            <div className="item">
              <h4>Quantity</h4>
              {product.quantity}
            </div>
            <div className="item">
              <h4>Price</h4>$ {product.price}
            </div>

            <div className="item btn">
              <div
                className="cart_remove_btn"
                onClick={() => removeItem(product._id)}
              >
                Delete
              </div>
            </div>
          </div>
        ))
      : null;

  return <div>{showItem()}</div>;
};

export default CartBlock;
