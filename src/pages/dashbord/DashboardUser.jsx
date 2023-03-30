import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import VerticalNavBar from "../../components/VerticalNavBar";
import BarChartUser from "../../components/BarChartUser";
import LineChartUser from "../../components/LineChartUser";
import RadarChartUser from "../../components/RadarChartUser/RadarChartUser";
import UserName from "../../components/UserName";
import UserMainData from "../../components/UserMainData";
import RadialBarChartUser from "../../components/RadialBarChartUser ";
import ApiService from "../../api/ApiService";
import User from "../../api/UserMainDataClass";
import BarChartClass from "../../api/BarChartClass";
import UserPerformance from "../../api/RadarChartClass";
import { useParams } from "react-router-dom";

const Dashboard = () => {
  const { userId } = useParams();
  const [userName, setUserName] = useState(null);
  const [userActivity, setUserActivity] = useState(null);
  const [userScore, setUserScore] = useState(null);
  const [userData, setUserMain] = useState(null);
  const [userPerformance, setUserPerformance] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const [userData, userActivityData, performanceData] = await Promise.all([
        ApiService.getUser(userId),
        ApiService.getUserActivity(userId),
        ApiService.getUserPerformance(userId),
      ]);
      // console.log("performanceData:", performanceData);

      const formattedUserName = new User(userData.data);
      setUserName(formattedUserName);

      const formattedUserActivity = new BarChartClass(userActivityData.data);
      setUserActivity(formattedUserActivity);

      const formattedUserScore = new User(userData.data);
      setUserScore(formattedUserScore);

      const formattedUser = new User(userData.data);
      setUserMain(formattedUser);

      const userPerformanceInstance = new UserPerformance(
        userId,
        performanceData.data.kind,
        performanceData.data.data
      );
      // console.log("userPerformanceInstance:", userPerformanceInstance);

      setUserPerformance(userPerformanceInstance);
    }

    fetchData();
  }, [userId]);

  return (
    <div>
      <Header />
      <main>
        <VerticalNavBar />
        <section className="dashboard">
          <UserName userName={userName} />
          <section className="user_data">
            <div className="user_data--activity">
              <BarChartUser userActivity={userActivity} />
              <div className="user_performances">
                <LineChartUser />
                <RadarChartUser userPerformance={userPerformance} />
                {/* Passer la props userScore à RadialBarChartUser */}
                <RadialBarChartUser userScore={userScore} />
              </div>
            </div>
            <UserMainData userData={userData} />
          </section>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
