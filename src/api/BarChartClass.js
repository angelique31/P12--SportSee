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
