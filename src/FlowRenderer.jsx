import React from 'react';
import ChoiceStep from './ChoiceStep';
import FillStep from './FillStep';
import StoryStep from './StoryStep';
import FeedbackStep from './FeedbackStep';
import EndStep from './EndStep';
import AdStep from './AdStep';
import PickReadStep from './PickReadStep';
import CookGameStep from './CookGameStep';
import './index.css';

/**
 * FlowRenderer 组件
 * 根据 step.type 渲染不同类型的步骤组件
 * 
 * @param {Object} props - 组件属性
 * @param {Object} props.step - 步骤数据对象，必须包含 type 属性
 * @param {Function} props.onNext - 下一步回调函数，接收 (data, step) 参数
 * @param {Function|null} props.onPrevious - 上一步回调函数
 */
const FlowRenderer = ({ step, onNext, onPrevious }) => {
  // 如果没有 step 或 step.type，返回 null
  if (!step || !step.type) {
    console.warn('FlowRenderer: step 或 step.type 未定义');
    return null;
  }

  // 根据 step.type 渲染对应的组件
  switch (step.type) {
    case 'choice':
      return (
        <ChoiceStep
          step={step}
          onNext={onNext}
          onPrevious={onPrevious}
        />
      );

    case 'fill':
      return (
        <FillStep
          step={step}
          onNext={onNext}
          onPrevious={onPrevious}
        />
      );

    case 'story':
      return (
        <StoryStep
          step={step}
          onNext={onNext}
          onPrevious={onPrevious}
        />
      );

    case 'feedback':
      return (
        <FeedbackStep
          step={step}
          onNext={onNext}
          onPrevious={onPrevious}
        />
      );

    case 'end':
      return (
        <EndStep
          step={step}
          onNext={onNext}
          onPrevious={onPrevious}
        />
      );

    case 'ad':
      return (
        <AdStep
          step={step}
          onNext={onNext}
          onPrevious={onPrevious}
        />
      );

    case 'pick-read':
      return (
        <PickReadStep
          step={step}
          onNext={onNext}
          onPrevious={onPrevious}
        />
      );

    case 'cook-game':
      return (
        <CookGameStep
          step={step}
          onNext={onNext}
          onPrevious={onPrevious}
        />
      );

    default:
      console.warn(`FlowRenderer: 未知的 step.type "${step.type}"`);
      return (
        <div className="step-container">
          <h2 className="step-title">未知的步骤类型</h2>
          <p className="step-description">
            步骤类型 "{step.type}" 不支持，请检查配置。
          </p>
        </div>
      );
  }
};

export default FlowRenderer;
