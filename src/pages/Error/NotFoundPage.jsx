import React from "react";
import { NavLink } from "react-router-dom";

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
