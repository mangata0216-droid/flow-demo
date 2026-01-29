import React from 'react';
import './StepCommon.css';

/**
 * End 步骤组件（简化版）
 * 用于结束流程
 * 
 * step 数据格式示例:
 * {
 *   type: 'end',
 *   message: '您的反馈已提交成功',
 *   buttonText: '重新开始',
 *   onRestart: () => {}, // 重新开始回调（可选）
 * }
 */
const EndStep = ({ step, onNext }) => {
  const handleRestart = () => {
    if (step.onRestart) {
      step.onRestart();
    } else if (onNext) {
      onNext({ action: 'restart' }, step);
    }
  };

  return (
    <div
      className={`step-container step-container-end ${step?.backgroundImage ? 'step-container--has-bg' : ''}`}
      style={
        step?.backgroundImage
          ? { backgroundImage: `url(${step.backgroundImage})` }
          : undefined
      }
    >
      <div className="step-content--overlay">
        {step.message && (
          <div className="end-message">
            {typeof step.message === 'string' ? (
              <p>{step.message}</p>
            ) : (
              step.message
            )}
          </div>
        )}
      </div>

      <div className="step-actions">
        {step.buttonText && (
          <button className="step-button step-button-primary" onClick={handleRestart}>
            {step.buttonText}
          </button>
        )}
      </div>
    </div>
  );
};

export default EndStep;
