import { getToken } from "@/utils/actions/auth";
import React from "react";

const UpdateProfile = async () => {
  const token = await getToken();
  return <div> update profile {token}</div>;
};

export default UpdateProfile;
