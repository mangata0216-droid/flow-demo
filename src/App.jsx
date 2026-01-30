import React, { useState } from 'react';
// 1. 导入你的剧本数据
import { flow1 } from './flow1.js'; 
import { flow2 } from './flow2.js'; 
import { flow3 } from './flow3.js'; 
// 2. 导入渲染引擎
import FlowRenderer from './FlowRenderer';
// 3. 导入卡片列表组件
import CardList from './CardList';
import './App.css';

function App() {
  // 3. 核心状态：当前走到流程的哪一步（索引从 0 开始）
  const [currentIndex, setCurrentIndex] = useState(0);
  // 4. 新增状态：是否显示卡片列表页面
  const [showCardList, setShowCardList] = useState(true);
  // 5. 新增状态：当前选择的 flow
  const [currentFlow, setCurrentFlow] = useState(flow1);

  // 获取当前的步骤数据
  const currentStep = currentFlow[currentIndex];

  /**
   * 处理“下一步”的逻辑
   * @param {Object} data - 来自子组件（如 ChoiceStep 或 FillStep）传回的用户操作数据
   */
  const handleNext = (data) => {
    console.log('当前操作数据:', data);

    // 优先使用子组件传回的 nextStepIndex（Choice、Fill、Feedback 都会传）
    if (data?.nextStepIndex !== undefined) {
      setCurrentIndex(data.nextStepIndex);
      return;
    }

    // 逻辑 A: 如果是选择题 (choice)
    if (currentStep.type === 'choice') {
      // 兼容不同子组件字段：success / isCorrect
      const isCorrect = data?.success ?? data?.isCorrect ?? false;
      const nextIndex = isCorrect ? currentStep.successNext : currentStep.failNext;
      if (nextIndex !== undefined) {
        setCurrentIndex(nextIndex);
      } else {
        // 如果没有设置successNext和failNext，直接进入下一数组元素
        if (currentIndex < currentFlow.length - 1) {
          setCurrentIndex(currentIndex + 1);
        }
      }
    } 
    // 逻辑 B: 如果是反馈页 (feedback) 或 普通叙事页 (story)
    else if (currentStep.next !== undefined) {
      // 如果数据里指定了跳转到哪一步（比如反馈完回到原题）
      setCurrentIndex(currentStep.next);
    }
    // 逻辑 C: 如果是最后一步 (end)
    else if (currentStep.type === 'end') {
      setCurrentIndex(0); // 重新开始
    } 
    // 逻辑 D: 默认情况，直接进入下一数组元素
    else {
      if (currentIndex < currentFlow.length - 1) {
        setCurrentIndex(currentIndex + 1);
      }
    }
  };

  // 处理“上一步”（可选）
  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // 处理卡片点击，进入对应的 flow
  const handleCardClick = (flowName) => {
    // 根据 flowName 切换不同的 flow 数据
    let selectedFlow;
    switch (flowName) {
      case 'rescue':
        selectedFlow = flow1;
        break;
      case 'explore':
        selectedFlow = flow2;
        break;
      case 'cook':
        selectedFlow = flow3;
        break;
      default:
        selectedFlow = flow1;
    }
    setCurrentFlow(selectedFlow);
    setCurrentIndex(0);
    setShowCardList(false);
  };

  return (
    <div className="phone-container">
      <div className="app-container">
        {showCardList ? (
          <CardList onCardClick={handleCardClick} />
        ) : (
          <>
            <FlowRenderer 
              step={currentStep} 
              onNext={handleNext} 
            />
            
            <div className="debug-info">
              当前步骤索引: {currentIndex} | 类型: {currentStep?.type}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;