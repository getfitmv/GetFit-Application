import React from "react";
import UserLayout from "../../../hoc/userLayout";

import ManageCatgs from "./manageCatgs";
import ManageGenders from "./manageGenders";

const ManageCatogeries = () => {
  return (
    <UserLayout>
      <ManageCatgs />
      <ManageGenders />
    </UserLayout>
  );
};

export default ManageCatogeries;
