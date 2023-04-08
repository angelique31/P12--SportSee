import PropTypes from "prop-types";

/**
 * The UserName component displays the user's name and a congratulatory message
 *
 * @param {Object} props - Component properties.
 * @param {Object} props.userName - Object containing the user's first name.
 * @returns {JSX.Element} UserName component.
 */

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
