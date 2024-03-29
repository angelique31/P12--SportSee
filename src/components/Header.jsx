import React from "react";
import logoSportsee from "../assets/logo-sportsee.png";
import { Link } from "react-router-dom";

/**
 * The Header component displays the navigation bar at the top of the page,
 * featuring the Sportsee logo and links to various pages of the site.
 *
 * @component
 * <Header />
 */
const Header = () => {
  return (
    <nav className="nav_container">
      <Link className="nav_link" to="/home">
        <img
          className="nav_container--logo"
          src={logoSportsee}
          alt="logo sportsee"
        />
      </Link>
      <ul className="nav_container--title">
        <li>
          <Link className="nav_link" to="/">
            Accueil
          </Link>
        </li>
        <li>
          <Link className="nav_link" to="/home/dashboard/:userId">
            Profil
          </Link>
        </li>
        <li>
          <Link className="nav_link" to="/home/dashboard/:userId">
            Réglage
          </Link>
        </li>
        <li>
          <Link className="nav_link" to="/home/dashboard/:userId">
            Communauté
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
