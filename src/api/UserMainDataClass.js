class User {
  constructor(data) {
    // console.log(data);
    this.id = data.id;
    this.firstName = data.userInfos.firstName;
    this.todayScore = data.todayScore || data.score;
    this.keyData = {
      calorieCount: data.keyData.calorieCount,
      proteinCount: data.keyData.proteinCount,
      carbohydrateCount: data.keyData.carbohydrateCount,
      lipidCount: data.keyData.lipidCount,
    };
  }
}

export default User;
