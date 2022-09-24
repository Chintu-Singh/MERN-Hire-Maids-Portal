import UserService from "./users";
import axios from "axios";

const getProfile = async () => {
  UserService.setToken();
  const res = await axios.get("/profile/details").catch((err) => {
    console.log(err);
    return {
      status: 1,
    };
  });

  if (res.data) {
    return {
      status: 0,
      ...res.data,
    };
  } else {
    return res;
  }
};

const updateProfile = async (profile) => {
  UserService.setToken();
  const res = await axios.post("/profile/update", profile).catch((err) => {
    console.log(err);
    return {
      status: 1,
    };
  });

  return res.data;
};

const getApplicant = async (email) => {
  UserService.setToken();
  const res = await axios
    .post("/profile/getGiven", {
      email: email,
    })
    .catch((err) => {
      console.log(err);
      return {
        status: 1,
      };
    });

  return res.data;
};

const exportModule = {
  getProfile,
  updateProfile,
  getApplicant,
};

export default exportModule;
