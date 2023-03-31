import PropTypes from "prop-types";
import caloriIcon from "../assets/iconsEnergy/calories-icon.png";
import proteinIcon from "../assets/iconsEnergy/protein-icon.png";
import appleIcon from "../assets/iconsEnergy/apple-icon.png";
import burgerIcon from "../assets/iconsEnergy/burger-icon.png";

const UserMainData = ({ userData }) => {
  return (
    <>
      {userData && (
        <div className="energy_container">
          <div className="energy_info">
            <img
              className="energy_info--logo"
              src={caloriIcon}
              alt="logo calorie"
            />
            <div className="info_calorie">
              <p className="info_calorie--number">
                {userData.keyData.calorieCount.toLocaleString("en-US", {
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
                {userData.keyData.proteinCount}g
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
                {userData.keyData.carbohydrateCount}g
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
              <p className="info_calorie--number">
                {userData.keyData.lipidCount}g
              </p>
              <p className="info_calorie--name">lipides</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
//On vérifie que userData est un objet avec la propriété keyData qui est également un objet contenant les propriétés calorieCount, proteinCount, carbohydrateCount, et lipidCount, toutes de type nombre.
UserMainData.propTypes = {
  userData: PropTypes.shape({
    keyData: PropTypes.shape({
      calorieCount: PropTypes.number,
      proteinCount: PropTypes.number,
      carbohydrateCount: PropTypes.number,
      lipidCount: PropTypes.number,
    }),
  }),
};
export default UserMainData;
