import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ApiService from "../../api/ApiService";
import Header from "../../components/Header";
import VerticalNavBar from "../../components/VerticalNavBar";
import BarChartUser from "../../components/BarChartUser";
import LineChartUser from "../../components/LineChartUser";
import RadarChartUser from "../../components/RadarChartUser";
import RadialBarChartUser from "../../components/RadialBarChartUser ";
import UserName from "../../components/UserName";
import UserMainData from "../../components/UserMainData";
import User from "../../api/UserMainDataClass";
import BarChartClass from "../../api/BarChartClass";
import UserPerformance from "../../api/RadarChartClass";
import LineChartClass from "../../api/LineChartClass";

/**
 * Le composant Dashboard affiche le tableau de bord de l'utilisateur, y compris la barre de navigation verticale, les informations de l'utilisateur et les graphiques.
 * Il récupère les données de l'utilisateur et les met en forme pour être utilisées par les sous-composants.
 *
 * The Dashboard component displays the user's dashboard, including the vertical navigation bar, user information, and charts.
 * It fetches the user's data and formats it to be used by the subcomponents.
 *
 * @returns {JSX.Element} Dashboard component
 */

const Dashboard = () => {
  const { userId } = useParams();
  const [userName, setUserName] = useState(null);
  const [userActivity, setUserActivity] = useState(null);
  const [userScore, setUserScore] = useState(null);
  const [userData, setUserMain] = useState(null);
  const [userPerformance, setUserPerformance] = useState(null);
  const [transformedData, setTransformedData] = useState(null);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const [
        userData,
        userActivityData,
        performanceData,
        userAverageSessionsData,
      ] = await Promise.all([
        ApiService.getUser(userId),
        ApiService.getUserActivity(userId),
        ApiService.getUserPerformance(userId),
        ApiService.getUserAverageSessions(userId),
      ]);

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
      setUserPerformance(userPerformanceInstance);

      const formattedUserAverageSessions = new LineChartClass(
        userAverageSessionsData.data
      );
      const transformedData = formattedUserAverageSessions.transformedData.map(
        (entry) => ({
          day: entry.day,
          [`User${userId}`]: entry[userId],
        })
      );
      setTransformedData(transformedData);
    }

    fetchData();
  }, [userId]);

  /**
   * Updates the `isDataLoaded` state based on the availability of the data.
   * The `isDataLoaded` state is updated to `true` when all the data is available.
   * Otherwise, it's updated to `false`.
   *
   * Met à jour l'état `isDataLoaded` en fonction de la disponibilité des données.
   * L'état `isDataLoaded` est mis à jour en `true` lorsque toutes les données sont disponibles.
   * Sinon, il est mis à jour en `false`.
   * @effect
   */
  useEffect(() => {
    if (
      userPerformance &&
      userPerformance.data &&
      userPerformance.data.length > 0
    ) {
      setIsDataLoaded(true);
    } else {
      setIsDataLoaded(false);
    }
  }, [userPerformance]);

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
                {/* <LineChartUser /> */}
                <LineChartUser
                  userId={parseInt(userId)} // convertir userId en nombre avant de le passer au composant LineChartUser
                  transformedData={transformedData}
                />
                <RadarChartUser
                  userPerformance={userPerformance}
                  isDataLoaded={isDataLoaded}
                />
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
