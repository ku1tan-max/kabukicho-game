// src/engine/WorldManager.js
export const MAP_SIZE = 15;

export const BUILDINGS = {
  "해결사": { x: 1, y: 1, w: 2, h: 2, color: '#ffeb3b' },
  "진선조": { x: 11, y: 11, w: 3, h: 3, color: '#2196f3' },
  "맨션": { x: 1, y: 11, w: 2, h: 3, color: '#9c27b0' },
  "구청": { x: 6, y: 6, w: 3, h: 3, color: '#607d8b' },
  "공원": { x: 6, y: 1, w: 4, h: 2, color: '#4caf50' },
  "병원": { x: 11, y: 1, w: 2, h: 2, color: '#f44336' },
  "파친코": { x: 4, y: 4, w: 2, h: 2, color: '#ff5722' },
  "찻집": { x: 9, y: 4, w: 1, h: 1, color: '#795548' },
  "라면집": { x: 4, y: 9, w: 2, h: 1, color: '#ff9800' },
  "처리장": { x: 9, y: 9, w: 1, h: 1, color: '#3f51b5' },
  "펜트하우스": { x: 13, y: 13, w: 2, h: 2, color: '#ffd700' }
};

export const initializeWorld = () => {
  // 기본 도로(STREET)로 채우기
  const grid = Array(MAP_SIZE).fill(null).map(() => 
    Array(MAP_SIZE).fill(null).map(() => ({ type: 'STREET', isOrigin: false }))
  );

  // 건물 배치 로직
  Object.entries(BUILDINGS).forEach(([name, data]) => {
    for (let dy = 0; dy < data.h; dy++) {
      for (let dx = 0; dx < data.w; dx++) {
        const ny = data.y + dy;
        const nx = data.x + dx;
        if (ny < MAP_SIZE && nx < MAP_SIZE) {
          grid[ny][nx] = {
            type: name,
            isOrigin: (dx === 0 && dy === 0) // 좌상단 타일만 이름 표시용
          };
        }
      }
    }
  });

  return grid;
};