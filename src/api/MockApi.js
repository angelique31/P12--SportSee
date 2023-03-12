import React from "react";
import UserActivity from "../components/UserActivity";
// import UserMainData from "../components/UserMainData";
import UserAverageSessions from "../components/UserAverageSessions";
import UserPerformance from "../components/UserPerformance";
import UserName from "../components/UserName";
import UserMainData from "../components/UserMainData";

const MockApi = ({ user }) => {
  return (
    <section className="dashboard">
      <UserName />
      <section className="user_data">
        <UserActivity />
        <UserAverageSessions />
        <UserPerformance />
        <UserMainData />
      </section>
    </section>
  );
};

export default MockApi;
