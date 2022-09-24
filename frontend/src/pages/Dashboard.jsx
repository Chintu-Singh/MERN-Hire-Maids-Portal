import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Dashboard from "./components/DashboardSkeleton";
import ApiService from "../services/users.js";

import MyProfile from "./subpages/MyProfile";
import JobListing from "./subpages/JobListing";
import MyApplications from "./subpages/MyApplications";
import EditProfile from "./subpages/EditProfile";
import CreateJob from "./subpages/CreateJob";
import MyApplicationsRec from "./subpages/MyApplicationsRec";
import MyEmployees from "./subpages/MyEmployees";

const App = () => {
  const history = useHistory();
  const [page, setPage] = useState("My Profile");
  const [profileDets, setProfileDets] = useState({});

  const handlePage = (event) => {
    const value = event.currentTarget.getAttribute("value");

    setPage(value);
  };

  useEffect(() => {
    const setData = async () => {
      ApiService.setToken();
      const res = await ApiService.initDashboard();
      setProfileDets({
        profileType: res.type,
        firstName: res.firstName,
        lastName: res.lastName,
      });
      if (res.status === 1) {
        history.push("/login");
      }
    };
    setData();
  }, [history]);

  let content = "";
  if (page === "My Profile") {
    content = <MyProfile profileDets={profileDets} />;
  } else if (page === "Search work") {
    content = <JobListing profileDets={profileDets} />;
  } else if (page === "My Applied works") {
    content = <MyApplications profileDets={profileDets} />;
  } else if (page === "Edit Profile") {
    content = <EditProfile profileDets={profileDets} />;
  } else if (page === "Create work") {
    content = <CreateJob profileDets={profileDets} />;
  } else if (page === "My Listings") {
    content = <MyApplicationsRec />;
  } else if (page === "My Maids") {
    content = <MyEmployees />;
  }

  return (
    <>
      <Dashboard
        title={page[0].toUpperCase() + page.substring(1)}
        profileDets={profileDets}
        content={content}
        handlePage={handlePage}
      />
    </>
  );
};

export default App;
