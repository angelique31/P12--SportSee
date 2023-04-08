/**
 * Represents a user's performance in a specific area, such as strength or endurance.
 * Creates an instance of UserPerformance.
 * @param {number} userId - The ID of the user.
 * @param {Object} kind - An object containing the types of performance, such as cardio or strength.
 * @param {Array} performanceData - An array of objects containing performance data for each type.
 */

class UserPerformance {
  constructor(userId, kind, performanceData) {
    this.userId = userId;
    this.kind = kind;
    this.data = performanceData.map((item) => {
      return {
        value: item.value,
        kind: this.kind[item.kind],
      };
    });
  }
}
export default UserPerformance;
