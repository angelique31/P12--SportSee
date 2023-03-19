import React from "react";
import UserActivity from "../components/UserActivity";

import UserAverageSessions from "../components/UserAverageSessions";
import UserPerformance from "../components/UserPerformance";
import UserName from "../components/UserName";
import UserMainData from "../components/UserMainData";
import UserScore from "../components/UserScore";

const MockApi = () => {
  return (
    <section className="dashboard">
      <UserName />
      <section className="user_data">
        <div className="user_data--activity">
          <UserActivity />
          <div className="user_performances">
            <UserAverageSessions />
            <UserPerformance />
            <UserScore />
          </div>
        </div>

        <UserMainData />
      </section>
    </section>
  );
};

export default MockApi;
