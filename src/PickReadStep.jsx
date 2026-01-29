import React, { useState } from 'react';
import './StepCommon.css';

/**
 * PickReadStep 步骤组件
 * 用于显示选择题/选项题，支持音频播放功能
 * 
 * step 数据格式示例:
 * {
 *   type: 'pick-read',
 *   title: '请选择正确答案',
 *   options: [
 *     { id: '1', label: '选项A', value: 'a' },
 *     { id: '2', label: '选项B', value: 'b' },
 *   ],
 *   multiple: false, // 是否多选
 *   successValue: 'a', // 成功的值（单选时）
 *   successValues: ['a', 'b'], // 成功的值（多选时）
 *   successNext: 2, // 成功时跳转的步骤索引
 *   failNext: 3, // 失败时跳转的步骤索引
 *   audioUrl: '/audio/correct-answer.mp3', // 成功时播放的音频
 * }
 */
const PickReadStep = ({ step, onNext, onPrevious }) => {
  const [selectedValues, setSelectedValues] = useState(
    step.multiple ? [] : null
  );
  const [audioPlayed, setAudioPlayed] = useState(false);

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

    // 根据 successNext / failNext 决定跳转
    const success = isSuccess();
    
    if (success) {
      // 如果选择正确
      if (!audioPlayed && step.audioUrl) {
        // 第一次点击，播放音频
        try {
          new Audio(step.audioUrl).play();
          setAudioPlayed(true);
        } catch (error) {
          console.error('音频播放失败:', error);
          // 音频播放失败时，直接跳转
          onNext?.({
            selectedValues,
            success,
            nextStepIndex: step.successNext,
          }, step);
        }
      } else {
        // 第二次点击或无音频，执行跳转
        onNext?.({
          selectedValues,
          success,
          nextStepIndex: step.successNext,
        }, step);
      }
    } else {
      // 如果选择错误，直接跳转
      onNext?.({
        selectedValues,
        success,
        nextStepIndex: step.failNext,
      }, step);
    }
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
      </div>

      <div className="step-actions">
        {onPrevious && (
          <button className="step-button step-button-secondary" onClick={onPrevious}>
            上一步
          </button>
        )}
        <button className="step-button step-button-primary" onClick={handleNext}>
          {audioPlayed ? '继续' : '下一步'}
        </button>
      </div>
    </div>
  );
};

export default PickReadStep;