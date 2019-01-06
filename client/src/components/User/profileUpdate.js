import React from "react";
import UserLayout from "../../hoc/userLayout";
import PersonalInfo from "./PersonalInfo";

const ProfileUpdate = () => {
  return (
    <UserLayout>
      <h1>Profile</h1>
      <PersonalInfo />
    </UserLayout>
  );
};

export default ProfileUpdate;
