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
