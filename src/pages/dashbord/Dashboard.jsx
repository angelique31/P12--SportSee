import React from "react";
import Header from "../../components/Header";
import VerticalNavBar from "../../components/VerticalNavBar";
import MockApi from "../../api/MockApi";
import { useParams } from "react-router-dom";

const Dashboard = () => {
  const { userId } = useParams();
  return (
    <div>
      <Header />
      <main>
        <VerticalNavBar />
        <MockApi userId={userId} />
      </main>
    </div>
  );
};

export default Dashboard;
