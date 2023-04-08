import React from "react";
import { NavLink } from "react-router-dom";

/**
 * The NotFoundPage component displays a 404 error page when the requested page is not found.
 * It also provides a link to return to the homepage.
 *
 * @returns {JSX.Element} NotFoundPage component
 */
const NotFoundPage = () => {
  return (
    <div>
      <div className="center_page">
        <h1 className="title">404</h1>
        <p className="title__text">
          Oups! La page que vous demandez n'existe pas.
        </p>
        <NavLink to="/" className="title__return">
          Retourner sur la page d’accueil
        </NavLink>
      </div>
    </div>
  );
};

export default NotFoundPage;
