// src/engine/InteractionManager.js

export const handleEvents = (characters, grid, addLog) => {
  const updatedCharacters = characters.map(char => {
    let updatedChar = { ...char };
    
    // 현재 캐릭터가 딛고 있는 타일 확인
    const cell = grid[char.position.y][char.position.x];

    // 1. 건물 도착 이벤트
    if (cell.type !== 'STREET') {
      updatedChar = applyBuildingEffect(updatedChar, cell.type, addLog);
    }

    return updatedChar;
  });

  // 2. 캐릭터 만남 이벤트 (같은 칸에 있는 경우)
  checkMeetings(updatedCharacters, addLog);

  return updatedCharacters;
};

const applyBuildingEffect = (char, buildingType, addLog) => {
  const stats = { ...char.stats };
  
  switch (buildingType) {
    case '라면집':
      stats.hp = Math.min(100, stats.hp + 30);
      stats.money -= 100;
      addLog('news', `${char.name}(이)가 라면집에서 배를 채웠습니다.`);
      addLog('personal', `라면 한 그릇 뚝딱!`, char.id);
      break;
    case '파친코':
      const win = Math.random() > 0.5;
      const amount = win ? 500 : -500;
      stats.money = Math.max(0, stats.money + amount);
      stats.fun = 100;
      addLog('news', `${char.name}(이)가 파친코에서 ${win ? '대박' : '쪽박'}을 쳤습니다!`);
      addLog('personal', `오늘 파친코 결과는... ${win ? '대박' : '폭망'}.`, char.id);
      break;
    default:
      break;
  }
  return { ...char, stats };
};

const checkMeetings = (chars, addLog) => {
  const posMap = {};
  chars.forEach(c => {
    const key = `${c.position.x},${c.position.y}`;
    if (!posMap[key]) posMap[key] = [];
    posMap[key].push(c);
  });

  Object.values(posMap).forEach(meetingChars => {
    if (meetingChars.length >= 2) {
      const [c1, c2] = meetingChars;
      addLog('news', `${c1.name}와 ${c2.name}(이)가 마주쳐서 기싸움을 벌입니다!`);
    }
  });
};