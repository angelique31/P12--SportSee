import React from "react";
import Header from "../../components/Header";
import VerticalNavBar from "../../components/VerticalNavBar";
import MockApi from "../../api/MockApi";
import { useParams } from "react-router-dom";

const Dashboard = () => {
  const { userId } = useParams();

  console.log(window.location.href);
  return (
    <div>
      <Header />
      <VerticalNavBar />
      <MockApi userId={userId} />
    </div>
  );
};

export default Dashboard;
