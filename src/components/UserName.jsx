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

export default UserName;
