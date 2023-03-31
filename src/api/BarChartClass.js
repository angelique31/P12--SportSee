/**
 * Creates a new instance of BarChartClass.
 * @constructor
 * @param {Object} data - The data used to create the BarChartClass object.
 * @property {number} id - The user ID associated with the data.
 * @property {Array} days - An array of days associated with the user's sessions.
 * @property {Array} kilos - An array of kilogram values associated with the user's sessions.
 * @property {Array} calories - An array of calorie values associated with the user's sessions.
 */
class BarChartClass {
  constructor(data) {
    // console.log(data);
    this.id = data.userId;
    this.sessions = data.sessions;
    this.days = this.sessions?.map((session) => session.day) || [];
    this.kilos = this.sessions?.map((session) => session.kilogram) || [];
    this.calories = this.sessions?.map((session) => session.calories) || [];
  }
}

export default BarChartClass;
