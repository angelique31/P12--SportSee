import React from "react";
import { USER_MAIN_DATA } from "../mockedData";
import { useParams } from "react-router-dom";
import caloriIcon from "../assets/iconsEnergy/calories-icon.png";
import proteinIcon from "../assets/iconsEnergy/protein-icon.png";
import appleIcon from "../assets/iconsEnergy/apple-icon.png";
import burgerIcon from "../assets/iconsEnergy/burger-icon.png";

const UserMainData = () => {
  const { userId } = useParams();
  const user = USER_MAIN_DATA.find((item) => item.id === parseInt(userId));

  return (
    <>
      {user && (
        <div className="energy_container">
          <div className="energy_info">
            <img
              className="energy_info--logo"
              src={caloriIcon}
              alt="logo calorie"
            />
            <div className="info_calorie">
              <p className="info_calorie--number">
                {user.keyData.calorieCount.toLocaleString("en-US", {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })}
                kCal
              </p>
              <p className="info_calorie--name">calories</p>
            </div>
          </div>
          <div className="energy_info">
            <img
              className="energy_info--logo"
              src={proteinIcon}
              alt="logo protein"
            />
            <div className="info_calorie">
              <p className="info_calorie--number">
                {user.keyData.proteinCount}g
              </p>
              <p className="info_calorie--name">Protéines</p>
            </div>
          </div>
          <div className="energy_info">
            <img
              className="energy_info--logo"
              src={appleIcon}
              alt="logo apple"
            />
            <div className="info_calorie">
              <p className="info_calorie--number">
                {user.keyData.carbohydrateCount}g
              </p>
              <p className="info_calorie--name">glucides</p>
            </div>
          </div>
          <div className="energy_info">
            <img
              className="energy_info--logo"
              src={burgerIcon}
              alt="logo burger"
            />
            <div className="info_calorie">
              <p className="info_calorie--number">{user.keyData.lipidCount}g</p>
              <p className="info_calorie--name">lipides</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserMainData;
