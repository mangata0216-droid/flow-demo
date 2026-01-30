import React, { useState } from 'react';
import './StepCommon.css';

/**
 * Story 步骤组件（支持对话类型）
 * 用于展示文本内容和 Next 按钮
 * 
 * step 数据格式示例:
 * {
 *   type: 'story',
 *   content: '这是故事内容...', // 场景描述
 *   dialogues: [ // 对话内容
 *     {
 *       character: 'Skylar',
 *       avatar: '/image/skylar-avatar.png',
 *       text: '有人受伤了！'
 *     },
 *     {
 *       character: 'User',
 *       avatar: '/image/user-avatar.png',
 *       text: 'Medic! 扫描受伤的人！'
 *     }
 *   ]
 * }
 */
const StoryStep = ({ step, onNext }) => {
  // 追踪当前对话索引
  const [currentDialogueIndex, setCurrentDialogueIndex] = useState(0);

  const handleNext = () => {
    // 检查是否有对话内容
    if (step.dialogues && Array.isArray(step.dialogues)) {
      // 检查是否还有更多对话
      if (currentDialogueIndex < step.dialogues.length - 1) {
        // 显示下一句对话
        setCurrentDialogueIndex(currentDialogueIndex + 1);
        return;
      }
    }
    // 没有对话或对话已结束，触发父组件的 onNext
    onNext?.(null, step);
  };

  // 检查是否有对话内容
  const hasDialogues = step.dialogues && Array.isArray(step.dialogues) && step.dialogues.length > 0;
  // 获取当前对话
  const currentDialogue = hasDialogues ? step.dialogues[currentDialogueIndex] : null;

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
        {/* 场景描述 */}
        {step.content && (
          <div className="scene-description">
            <p>{step.content}</p>
          </div>
        )}

        {/* 对话内容 */}
        {hasDialogues && (
          <div className="dialogue-container">
            {/* 角色立绘 */}
            {currentDialogue.avatar && (
              <div className="character-avatar">
                <img src={currentDialogue.avatar} alt={currentDialogue.character} />
              </div>
            )}
            {/* 对话框 */}
            <div className="dialogue-box">
              {/* 角色名称 */}
              {currentDialogue.character && (
                <div className="character-name">{currentDialogue.character}</div>
              )}
              {/* 对话文本 */}
              <div className="dialogue-text">{currentDialogue.text}</div>
            </div>
          </div>
        )}
      </div>

      <div className="step-actions">
        <button className="step-button step-button-primary" onClick={handleNext}>
          {hasDialogues && currentDialogueIndex < step.dialogues.length - 1 ? '继续' : 'Next'}
        </button>
      </div>
    </div>
  );
};

export default StoryStep;