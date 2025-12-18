// src/components/Map/MapView.jsx 수정
import React from 'react'; // 이 줄을 추가하세요!
import './MapView.css';
import { BUILDINGS } from '../../engine/WorldManager';

const MapView = ({ grid, characters }) => {
  return (
    <div className="map-grid">
      {grid.map((row, y) => row.map((cell, x) => {
        // 현재 좌표에 있는 캐릭터들 찾기
        const presentChars = characters.filter(c => c.position.x === x && c.position.y === y);

        return (
          <div key={`${x}-${y}`} className={`cell ${cell.type !== 'STREET' ? 'building' : ''}`} 
               style={{ backgroundColor: BUILDINGS[cell.type]?.color }}>
            {cell.isOrigin && <span className="building-label">{cell.type}</span>}
            
            {/* 캐릭터 렌더링 */}
            <div className="character-container">
              {presentChars.map(char => (
                <div key={char.id} className={`char-dot ${char.name === '사용자' ? 'player' : ''}`} title={char.name}>
                  <span className="char-name">{char.name[0]}</span>
                </div>
              ))}
            </div>
          </div>
        );
      }))}
    </div>
  );
};

export default MapView; // 이 줄이 반드시 있어야 App.jsx에서 읽을 수 있습니다!