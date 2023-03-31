/**
 * A class for representing a user and their associated data.
 * Creates an instance of User.
 * @param {Object} data - An object containing user data.
 */
class User {
  constructor(data) {
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
