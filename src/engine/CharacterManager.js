// src/engine/CharacterManager.js
import { BUILDINGS } from './WorldManager';

export const moveCharacters = (characters, grid) => {
  return characters.map(char => {
    const target = decideDestination(char);
    const newPos = getNextStep(char.position, target);
    
    return {
      ...char,
      position: newPos,
      stats: {
        ...char.stats,
        hp: Math.max(0, char.stats.hp - 2),
        fun: Math.max(0, char.stats.fun - 1)
      }
    };
  });
};

const decideDestination = (char) => {
  const { hp, money, fun } = char.stats;
  if (hp < 30) return BUILDINGS["라면집"];
  if (money < 200) return BUILDINGS["공원"];
  if (fun < 40) return BUILDINGS["파친코"];
  return BUILDINGS["해결사"];
};

const getNextStep = (current, target) => {
  let nextX = current.x;
  let nextY = current.y;
  if (current.x < target.x) nextX++;
  else if (current.x > target.x) nextX--;
  else if (current.y < target.y) nextY++;
  else if (current.y > target.y) nextY--;
  return { x: nextX, y: nextY };
};