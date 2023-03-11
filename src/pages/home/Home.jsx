import React from "react";
import logoSportsee from "../../assets/logo-sportsee.png";
import logoGroup from "../../assets/group.png";
import { Link } from "react-router-dom";
import { USER_MAIN_DATA } from "../../mockedData";

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
