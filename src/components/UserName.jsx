import React from "react";
import { USER_MAIN_DATA } from "../mockedData";
import { useParams } from "react-router-dom";

const UserName = () => {
  const { userId } = useParams();
  const user = USER_MAIN_DATA.find((item) => item.id === parseInt(userId));

  return (
    <div className="user_title">
      <h1 className="user_title--name">
        Bonjour <span>{user.userInfos.firstName}</span>
      </h1>
      <p className="user_title--congrat">
        Félicitation ! Vous avez explosé vos objectifs hier 👏
      </p>
    </div>
  );
};

export default UserName;
