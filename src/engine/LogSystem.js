// src/engine/LogSystem.js
export const generateBlogPost = (char) => {
  const templates = {
    '긴토키': ["오늘도 점프는 재미있었다.", "파르페 먹고 싶다.", "돈 없는 건 세상 탓이지 내 탓이 아냐."],
    '히지카타': ["오늘도 카부키초는 소란스럽다. 마요네즈가 부족하군.", "검문검색 강화가 필요하다.", "담배 맛이 쓰군."],
    '사용자': ["이 마을은 제정신이 아니다.", "내일은 좀 평화로웠으면 좋겠네."]
  };

  const myPosts = templates[char.name] || ["오늘도 무사히 하루가 갔다."];
  const content = myPosts[Math.floor(Math.random() * myPosts.length)];
  
  return {
    date: new Date().toLocaleTimeString(),
    content: content
  };
};