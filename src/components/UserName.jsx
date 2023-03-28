import React, { useState, useEffect } from "react";
// import { USER_MAIN_DATA } from "../mockedData";
import { useParams } from "react-router-dom";
import ApiService from "../api/ApiService";
import User from "../api/UserMainDataClass";

const UserName = () => {
  const { userId } = useParams();
  // const user = USER_MAIN_DATA.find((item) => item.id === parseInt(userId));
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const data = await ApiService.getUser(userId);
      const formattedUserName = new User(data.data);
      setUserName(formattedUserName);
    }

    fetchData();
  }, [userId]);

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

export default UserName;
