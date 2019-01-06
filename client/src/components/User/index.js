import React from "react";
import UserLayout from "../../hoc/userLayout";
import MyButton from "../utils/button";
import PurchaseHistory from "../utils/purchaseHistory";

const UserDashboard = ({ user }) => {
  return (
    <UserLayout>
      <div>
        <div className="user_nfo_panel">
          <h1>User Information </h1>
          <div>
            <span>
              Name: {user.userData.name} {user.userData.lastname}
            </span>
            <span>Eamil: {user.userData.email}</span>
          </div>
          <MyButton
            type="default"
            title="Edit Account Info"
            linkTo="/user/profile"
          />
        </div>

        {user.userData.history ? (
          <div className="user_nfo_panel">
            <h1>History Purchase </h1>
            <div className="user_product_block_wrapper">
              <PurchaseHistory history={user.userData.history} />
            </div>
          </div>
        ) : null}
      </div>
    </UserLayout>
  );
};

export default UserDashboard;
