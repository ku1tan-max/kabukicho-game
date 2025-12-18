// src/App.jsx
import React, { useState } from 'react';
import MapView from './components/Map/MapView';
import { initializeWorld } from './engine/WorldManager';
import { Character } from './models/Character';
import { moveCharacters } from './engine/CharacterManager'; // 이동 로직
import { handleEvents } from './engine/InteractionManager'; // 사건 로직
import { generateBlogPost } from './engine/LogSystem';     // 블로그 로직
import './components/Map/MapView.css';

function App() {
  const [grid] = useState(initializeWorld());
  const [turnIndex, setTurnIndex] = useState(0);
  const turns = ["아침", "저녁", "밤"];
  
  // 1. 초기 캐릭터 상태 설정
  const [characters, setCharacters] = useState([
    new Character('char_001', '긴토키', ['당뇨'], grid),
    new Character('char_002', '히지카타', ['마요라'], grid),
    new Character('char_005', '사용자', ['플레이어'], grid)
  ]);

  // 2. 로그 상태 설정
  const [logs, setLogs] = useState({ news: [], personal: {}, blogs: {} });
  const [activeTab, setActiveTab] = useState('news');

  // 로그 추가 함수
  const addLog = (type, content, charId = null) => {
    setLogs(prev => {
      if (type === 'personal' && charId) {
        const charLogs = prev.personal[charId] || [];
        return { 
          ...prev, 
          personal: { ...prev.personal, [charId]: [content, ...charLogs].slice(0, 5) } 
        };
      }
      return { 
        ...prev, 
        [type]: [content, ...prev[type] || []].slice(0, 10) 
      };
    });
  };

  // 턴 넘기기 메인 로직
  const handleNextTurn = () => {
    // A. 이동 수행
    let updatedChars = moveCharacters(characters, grid);
    
    // B. 사건 판정 (건물 도착, 만남 등)
    updatedChars = handleEvents(updatedChars, grid, addLog);
    
    // C. 밤일 경우 블로그 생성
    if (turns[turnIndex] === "밤") {
      updatedChars.forEach(c => {
        const post = generateBlogPost(c);
        setLogs(prev => ({
          ...prev,
          blogs: { ...prev.blogs, [c.id]: [post, ...(prev.blogs[c.id] || [])] }
        }));
      });
    }

    setCharacters(updatedChars);
    setTurnIndex((prev) => (prev + 1) % 3);
  };

  return (
    <div className="game-container">
      <MapView grid={grid} characters={characters} />
      
      <div className="ui-panel">
        <h1>카부키초 일상 대소동</h1>
        <hr />
        <h2>현재 시간: <span className="turn-text">{turns[turnIndex]}</span></h2>
        
        <div className="tabs">
          <button className={activeTab === 'news' ? 'active' : ''} onClick={() => setActiveTab('news')}>뉴스</button>
          <button className={activeTab === 'personal' ? 'active' : ''} onClick={() => setActiveTab('personal')}>개인</button>
          <button className={activeTab === 'blogs' ? 'active' : ''} onClick={() => setActiveTab('blogs')}>블로그</button>
        </div>
        
        <div className="log-content">
          {activeTab === 'news' && (
            logs.news.length > 0 ? logs.news.map((l, i) => <p key={i}>📢 {l}</p>) : <p>평화로운 마을입니다.</p>
          )}
          {activeTab === 'personal' && characters.map(c => (
            <div key={c.id} className="log-item">
              <strong>[{c.name}]</strong>: {logs.personal[c.id]?.[0] || '조용함'}
            </div>
          ))}
          {activeTab === 'blogs' && characters.map(c => (
            <div key={c.id} className="log-item">
              <strong>{c.name}의 Blog</strong>: {logs.blogs[c.id]?.[0]?.content || '아직 글이 없습니다.'}
            </div>
          ))}
        </div>

        <button className="turn-btn" onClick={handleNextTurn}>다음 턴으로</button>
        
        <div className="char-list">
          <h3>주민 명부</h3>
          {characters.map(c => (
            <div key={c.id} className="char-info">
              {c.name} | HP: {c.stats.hp} | 💰 {c.stats.money}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;