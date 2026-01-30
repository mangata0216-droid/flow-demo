import React, { useState } from 'react';
import './StepCommon.css';

/**
 * Choice 步骤组件
 * 用于显示选择题/选项题，支持 successNext / failNext 控制跳转
 * 
 * step 数据格式示例:
 * {
 *   type: 'choice',
 *   title: '请选择您的偏好',
 *   options: [
 *     { id: '1', label: '选项A', value: 'a' },
 *     { id: '2', label: '选项B', value: 'b' },
 *   ],
 *   multiple: false, // 是否多选
 *   successValue: 'a', // 成功的值（单选时）
 *   successValues: ['a', 'b'], // 成功的值（多选时）
 *   successNext: 2, // 成功时跳转的步骤索引
 *   failNext: 3, // 失败时跳转的步骤索引
 * }
 */
const ChoiceStep = ({ step, onNext, onPrevious }) => {
  const [selectedValues, setSelectedValues] = useState(
    step.multiple ? [] : null
  );
  const [showFeedback, setShowFeedback] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  // 使用 useEffect 初始化状态，确保每次步骤加载时都能正确初始化
  React.useEffect(() => {
    setSelectedValues(step.multiple ? [] : null);
    setShowFeedback(false);
    setSelectedOption(null);
  }, [step]);

  const handleOptionClick = (option) => {
    if (step.multiple) {
      setSelectedValues((prev) => {
        if (prev.includes(option.value)) {
          return prev.filter((v) => v !== option.value);
        } else {
          return [...prev, option.value];
        }
      });
    } else {
      setSelectedValues(option.value);
      setSelectedOption(option);
      setShowFeedback(true);
    }
  };

  // 判断选择是否成功
  const isSuccess = () => {
    if (!selectedValues || (Array.isArray(selectedValues) && selectedValues.length === 0)) {
      return false;
    }

    // 如果有 successValue 或 successValues，判断是否匹配
    if (step.successValue !== undefined) {
      // 单选模式
      return selectedValues === step.successValue;
    }
    
    if (step.successValues && Array.isArray(step.successValues)) {
      // 多选模式：检查是否选择了所有成功值
      if (step.multiple && Array.isArray(selectedValues)) {
        return step.successValues.every(val => selectedValues.includes(val));
      }
      return false;
    }

    // 如果没有设置 successValue/successValues，默认视为成功
    return true;
  };

  const handleNext = () => {
    if (!selectedValues || (Array.isArray(selectedValues) && selectedValues.length === 0)) {
      alert('请至少选择一个选项');
      return;
    }

    // 确定下一步的索引
    let nextStepIndex;
    
    // 检查是否有选项特定的跳转配置
    if (step.optionNext && typeof step.optionNext === 'object') {
      // 确保selectedValues是字符串
      const valueKey = typeof selectedValues === 'string' ? selectedValues : String(selectedValues);
      // 根据选择的值获取对应的跳转索引
      nextStepIndex = step.optionNext[valueKey];
    }
    
    // 如果没有选项特定的跳转配置，使用默认的successNext/failNext逻辑
    if (nextStepIndex === undefined) {
      const success = isSuccess();
      nextStepIndex = success ? step.successNext : step.failNext;
    }
    
    // 将下一步的索引传递给回调
    onNext?.({
      selectedValues,
      success: isSuccess(),
      nextStepIndex,
    }, step);
  };

  const isSelected = (value) => {
    if (step.multiple) {
      return Array.isArray(selectedValues) && selectedValues.includes(value);
    }
    return selectedValues === value;
  };

  return (
    <div
      className={`step-container ${step?.backgroundImage ? 'step-container--has-bg' : ''}`}
      style={
        step?.backgroundImage
          ? { backgroundImage: `url(${step.backgroundImage})` }
          : undefined
      }
    >
      <div className="step-content--overlay">
        {step.title && (
          <h2 className="step-title">{step.title}</h2>
        )}
        
        {step.question && (
          <p className="step-description">{step.question}</p>
        )}
        {step.description && (
          <p className="step-description">{step.description}</p>
        )}

        <div className="choice-options">
          {step.options?.map((option) => (
            <button
              key={option.id || option.value}
              className={`choice-option ${isSelected(option.value) ? 'selected' : ''}`}
              onClick={() => handleOptionClick(option)}
            >
              <span className="choice-option-label">{option.label}</span>
              {isSelected(option.value) && (
                <span className="choice-option-check">✓</span>
              )}
            </button>
          ))}
        </div>
        
        {showFeedback && selectedOption && selectedOption.feedback && (
          <div className="choice-feedback">
            {selectedOption.feedback}
          </div>
        )}
      </div>

      <div className="step-actions">
        {onPrevious && (
          <button className="step-button step-button-secondary" onClick={onPrevious}>
            上一步
          </button>
        )}
        <button className="step-button step-button-primary" onClick={handleNext}>
          下一步
        </button>
      </div>
    </div>
  );
};

export default ChoiceStep;
