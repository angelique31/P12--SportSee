import React from "react";
import logoSportsee from "../../assets/logo-sportsee.png";
import logoGroup from "../../assets/group.png";
import { Link } from "react-router-dom";
import { USER_MAIN_DATA } from "../../mockedData";

/**
 * The Home component displays the homepage and the Sportsee logo and a list of links to user dashboards.
 * Each link leads to a user-specific dashboard.
 *
 * @returns {JSX.Element} Home component
 */
const Home = () => {
  return (
    <div>
      <img className="logo" src={logoSportsee} alt="logo sportsee" />
      <h1 className="logo_title">BIENVENUE !</h1>
      <div className="link_container">
        {USER_MAIN_DATA.map((user) => (
          <div className="link_identity" key={user.id}>
            <Link className="nav_link" to={`dashboard/${user.id}`}>
              <img className="logo_group" src={logoGroup} alt="logo sportsee" />
              <p className="identity">{`${user.userInfos.firstName} ${user.userInfos.lastName}`}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
