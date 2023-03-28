import PropTypes from "prop-types";

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

BarChartClass.propTypes = {
  id: PropTypes.number.isRequired,
  sessions: PropTypes.shape({
    day: PropTypes.string.isRequired,
    kilogram: PropTypes.number.isRequired,
    calories: PropTypes.number.isRequired,
  }).isRequired,
  days: PropTypes.arrayOf(PropTypes.string).isRequired,
  kilos: PropTypes.arrayOf(PropTypes.number).isRequired,
  calories: PropTypes.arrayOf(PropTypes.number).isRequired,
};
export default BarChartClass;
