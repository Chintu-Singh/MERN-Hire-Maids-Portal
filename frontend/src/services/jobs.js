import UserService from "./users";
import axios from "axios";

const addJob = async (job) => {
  const res = await axios.post("/job/add", job).catch((err) => {
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

const getAll = async (job) => {
  UserService.setToken();
  const res = await axios.get("/job/all").catch((err) => {
    console.log(err);
    return {
      status: 1,
    };
  });

  return res.data;
};

const applyJob = async (jobId, sop) => {
  UserService.setToken();
  const res = await axios
    .post("/job/apply", { jobId: jobId, sop: sop })
    .catch((err) => {
      console.log(err);
      return {
        status: 1,
      };
    });

  return res.data;
};

const getMy = async () => {
  UserService.setToken();
  const res = await axios.get("/job/getMy").catch((err) => {
    console.log(err);
    return {
      status: 1,
    };
  });

  return res.data;
};

const getRecJobs = async () => {
  UserService.setToken();
  const res = await axios.get("/job/getRecJobs").catch((err) => {
    console.log(err);
    return {
      status: 1,
    };
  });

  return res.data;
};

const getJob = async (jobId) => {
  UserService.setToken();
  const res = await axios
    .post("/job/getJob", {
      jobId: jobId,
    })
    .catch((err) => {
      console.log(err);
      return {
        status: 1,
      };
    });

  return res.data;
};

const editJob = async (data) => {
  UserService.setToken();
  const res = await axios.post("/job/editJob", data).catch((err) => {
    console.log(err);
    return {
      status: 1,
    };
  });

  return res.data;
};

const shortListUser = async (data) => {
  UserService.setToken();
  const res = await axios.post("/job/shortListUser", data).catch((err) => {
    console.log(err);
    return {
      status: 1,
    };
  });

  return res.data;
};

const acceptUser = async (data) => {
  UserService.setToken();
  const res = await axios.post("/job/acceptUser", data).catch((err) => {
    console.log(err);
    return {
      status: 1,
    };
  });

  return res.data;
};

const rejectUser = async (data) => {
  UserService.setToken();
  const res = await axios.post("/job/rejectUser", data).catch((err) => {
    console.log(err);
    return {
      status: 1,
    };
  });

  return res.data;
};

const deleteJob = async (data) => {
  UserService.setToken();
  const res = await axios.post("/job/deleteJob", data).catch((err) => {
    console.log(err);
    return {
      status: 1,
    };
  });

  return res.data;
};

const rateUser = async (data) => {
  UserService.setToken();
  const res = await axios.post("/job/rateUser", data).catch((err) => {
    console.log(err);
    return {
      status: 1,
    };
  });

  return res.data;
};

const rateJob = async (data) => {
  UserService.setToken();
  const res = await axios.post("/job/rateJob", data).catch((err) => {
    console.log(err);
    return {
      status: 1,
    };
  });

  return res.data;
};

const exportModule = {
  addJob,
  getAll,
  applyJob,
  getMy,
  getRecJobs,
  getJob,
  editJob,
  shortListUser,
  acceptUser,
  rejectUser,
  deleteJob,
  rateUser,
  rateJob,
};

export default exportModule;
