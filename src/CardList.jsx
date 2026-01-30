import React from 'react';
import './CardList.css';

const CardList = ({ onCardClick }) => {
  // 卡片数据，每个卡片对应一个不同的 flow
  const cards = [
    {
      id: 'flow1',
      title: '瓦拉飞船上的新朋友',
      description: '快来看看你能交几个好朋友？',
      image: '/image/card1.png',
      flowName: 'rescue'
    },
    {
      id: 'flow2',
      title: '野外探索挑战',
      description: '探索自然，学习野外生存技能',
      image: '/image/story-intro-step0.jpg',
      flowName: 'explore'
    },
    {
      id: 'flow3',
      title: '野外烹饪挑战',
      description: '输入食材单词，制作美味的食物',
      image: '/image/cookinggame.png',
      flowName: 'cook'
    }
  ];

  return (
    <div className="card-list-container">
      <h1 className="card-list-title">选择你的冒险</h1>
      <div className="card-grid">
        {cards.map((card) => (
          <div key={card.id} className="card">
            <div className="card-image-container">
              <img src={card.image} alt={card.title} className="card-image" />
            </div>
            <div className="card-content">
              <div className="card-text">
                <h2 className="card-title">{card.title}</h2>
                <p className="card-description">{card.description}</p>
              </div>
              <button 
                className="card-button" 
                onClick={() => onCardClick(card.flowName)}
              >
                开始冒险
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardList;