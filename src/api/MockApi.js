import React from "react";
import BarChartUser from "../components/BarChartUser";

import LineChartUser from "../components/LineChartUser";
import RadarChartUser from "../components/RadarChartUser/RadarChartUser";
import UserName from "../components/UserName";
import UserMainData from "../components/UserMainData";
import RadialBarChartUser from "../components/RadialBarChartUser ";

const MockApi = () => {
  return (
    <section className="dashboard">
      <UserName />
      <section className="user_data">
        <div className="user_data--activity">
          <BarChartUser />
          <div className="user_performances">
            <LineChartUser />
            <RadarChartUser />
            <RadialBarChartUser />
          </div>
        </div>

        <UserMainData />
      </section>
    </section>
  );
};

export default MockApi;
