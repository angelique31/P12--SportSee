import PropTypes from "prop-types";
const UserName = ({ userName }) => {
  return (
    <div className="user_title">
      <h1 className="user_title--name">
        Bonjour <span>{userName?.firstName}</span>
      </h1>
      <p className="user_title--congrat">
        Félicitation ! Vous avez explosé vos objectifs hier 👏
      </p>
    </div>
  );
};

UserName.propTypes = {
  userName: PropTypes.shape({
    firstName: PropTypes.string,
  }),
};
export default UserName;
