import React from 'react';
import './StepCommon.css';

/**
 * Story 步骤组件（简化版）
 * 用于展示文本内容和 Next 按钮
 * 
 * step 数据格式示例:
 * {
 *   type: 'story',
 *   content: '这是故事内容...',
 * }
 */
const StoryStep = ({ step, onNext }) => {
  const handleNext = () => {
    onNext?.(null, step);
  };

  return (
    <div
      className={`step-container story-step ${step?.backgroundImage ? 'story-step--has-bg' : ''}`}
      style={
        step?.backgroundImage
          ? { backgroundImage: `url(${step.backgroundImage})` }
          : undefined
      }
    >
      <div className="story-content story-content--overlay">
        {step.content && (
          <p>{step.content}</p>
        )}
      </div>

      <div className="step-actions">
        <button className="step-button step-button-primary" onClick={handleNext}>
          Next
        </button>
      </div>
    </div>
  );
};

export default StoryStep;
