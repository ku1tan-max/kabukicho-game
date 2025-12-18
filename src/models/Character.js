// src/models/Character.js
export class Character {
  constructor(id, name, traits = [], grid = null) {
    this.id = id;
    this.name = name;
    this.stats = { hp: 100, money: 1000, happiness: 50, fun: 50, lust: 30, clumsy: 80 };
    this.traits = traits;
    this.relationships = {};
    this.blog = [];
    
    // 생성 시 랜덤 위치 지정 (도로 위)
    this.position = grid ? this.getRandomSpawnPosition(grid) : { x: 7, y: 7 };
  }

  getRandomSpawnPosition(grid) {
    const streets = [];
    grid.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (cell.type === 'STREET') streets.push({ x, y });
      });
    });

    if (streets.length === 0) return { x: 0, y: 0 };
    const randomIndex = Math.floor(Math.random() * streets.length);
    return streets[randomIndex];
  }
}