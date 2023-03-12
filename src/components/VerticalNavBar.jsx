import React from "react";
import { Link } from "react-router-dom";
import iconOne from "../assets/iconsVerticalNav/icon1.png";
import iconTwo from "../assets/iconsVerticalNav/icon2.png";
import iconThree from "../assets/iconsVerticalNav/icon3.png";
import iconFour from "../assets/iconsVerticalNav/icon4.png";

const VerticalNavBar = () => {
  return (
    <nav className="nav_list">
      <ul className="nav_list--icon">
        <li>
          <Link className="nav_icon" to="/">
            <img className="nav_icon--logo" src={iconOne} alt="logo sportsee" />
          </Link>
        </li>
        <li>
          <Link className="nav_icon" to="/">
            <img className="nav_icon--logo" src={iconTwo} alt="logo sportsee" />
          </Link>
        </li>
        <li>
          <Link className="nav_link" to="/">
            <img
              className="nav_icon--logo"
              src={iconThree}
              alt="logo sportsee"
            />
          </Link>
        </li>
        <li>
          <Link className="nav_link" to="/">
            <img
              className="nav_icon--logo"
              src={iconFour}
              alt="logo sportsee"
            />
          </Link>
        </li>
      </ul>
      <div className="copyright">
        <p className="copyright_name">Copyright, SportSee 2020</p>
      </div>
    </nav>
  );
};

export default VerticalNavBar;
