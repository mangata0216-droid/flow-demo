import React from 'react';
import './CardList.css';

const CardList = ({ onCardClick }) => {
  // 卡片数据，每个卡片对应一个不同的 flow
  const cards = [
    {
      id: 'flow1',
      title: '拯救受伤飞行员',
      description: '展开救援任务，学习急救知识',
      image: '/image/card-adventure.png',
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
      title: '科学实验课堂',
      description: '动手做实验，学习科学原理',
      image: '/image/story-intro-step2.jpg',
      flowName: 'science'
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