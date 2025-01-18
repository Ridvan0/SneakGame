class Food {
  static createFoodPosition() {
    const x = Math.floor(Math.random() * 15) * 20;
    const y = Math.floor(Math.random() * 15) * 20;
    return {x, y};
  }
}

export default Food; 