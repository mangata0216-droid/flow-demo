import React, { useState, useEffect, useRef } from 'react';
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
 *   ],
 *   useTypewriter: true // 控制是否使用打字机效果
 * }
 */
const StoryStep = ({ step, onNext }) => {
  // 追踪当前对话索引
  const [currentDialogueIndex, setCurrentDialogueIndex] = useState(0);
  // 追踪打字机效果的当前显示文本（对话）
  const [displayText, setDisplayText] = useState('');
  // 追踪打字机效果的当前显示文本（描述）
  const [displayDescription, setDisplayDescription] = useState('');
  // 追踪打字机效果是否正在运行
  const [isTyping, setIsTyping] = useState(false);
  // 定时器引用
  const typeIntervalRef = useRef(null);
  // 音频元素引用
  const audioRef = useRef(null);

  // 安全获取对话内容
  const getDialogues = () => {
    if (step && step.content && Array.isArray(step.content.dialogues)) {
      return step.content.dialogues;
    }
    return [];
  };

  // 检查是否有对话内容
  const hasDialogues = getDialogues().length > 0;
  // 获取当前对话
  const currentDialogue = hasDialogues ? getDialogues()[currentDialogueIndex] : null;
  // 检查是否启用打字机效果
  const useTypewriter = step && step.content && step.content.useTypewriter;

  // 清除定时器的函数
  const clearTypeInterval = () => {
    if (typeIntervalRef.current) {
      clearInterval(typeIntervalRef.current);
      typeIntervalRef.current = null;
    }
  };

  // 打字机效果函数
  const startTypewriterEffect = (text, setDisplay) => {
    // 确保text是字符串类型
    if (!text || typeof text !== 'string') {
      setDisplay('');
      setIsTyping(false);
      return;
    }

    setDisplay('');
    setIsTyping(true);

    // 分割文本为单词数组，过滤掉空字符串
    const words = text.split(' ').filter(word => word.trim() !== '');
    let currentWordIndex = 0;

    // 清除之前的定时器
    clearTypeInterval();

    // 打字机效果定时器
    typeIntervalRef.current = setInterval(() => {
      if (currentWordIndex < words.length) {
        setDisplay(prev => {
          const newText = prev + (prev ? ' ' : '') + words[currentWordIndex];
          return newText;
        });
        currentWordIndex++;
      } else {
        setIsTyping(false);
        clearTypeInterval();
        // 确保最终显示完整文本，防止任何情况下的文本缺失
        setDisplay(text);
      }
    }, 300); // 每个单词之间的间隔时间（毫秒）
  };

  const handleNext = () => {
    // 如果正在打字，直接显示完整文本并停止打字
    if (isTyping) {
      clearTypeInterval();
      setIsTyping(false);
      
      // 直接显示完整文本
      if (currentDialogue && currentDialogue.text) {
        setDisplayText(currentDialogue.text);
      } else {
        setDisplayText('');
      }
      
      if (step && step.content && step.content.description) {
        setDisplayDescription(step.content.description);
      } else {
        setDisplayDescription('');
      }
      
      return;
    }

    // 检查是否有对话内容
    const dialogues = getDialogues();
    if (hasDialogues) {
      // 检查是否还有更多对话
      if (currentDialogueIndex < dialogues.length - 1) {
        // 显示下一句对话
        setCurrentDialogueIndex(currentDialogueIndex + 1);
        return;
      }
    }
    
    // 没有对话或对话已结束，触发父组件的 onNext
    if (onNext) {
      onNext(null, step);
    }
  };

  // 当当前对话变化时，重置对话文本
  useEffect(() => {
    // 清除之前的定时器
    clearTypeInterval();
    
    // 重置状态
    setIsTyping(false);
    
    if (currentDialogue && typeof currentDialogue.text === 'string') {
      if (useTypewriter) {
        startTypewriterEffect(currentDialogue.text, setDisplayText);
      } else {
        // 不使用打字机效果，直接显示完整文本
        setDisplayText(currentDialogue.text);
      }
    } else {
      setDisplayText('');
    }
    
    // 清理函数：清除定时器
    return () => {
      clearTypeInterval();
    };
  }, [currentDialogue, useTypewriter]);

  // 当描述变化时，重置描述文本
  useEffect(() => {
    // 清除之前的定时器
    clearTypeInterval();
    
    // 重置状态
    setIsTyping(false);
    
    if (step && step.content && typeof step.content.description === 'string') {
      if (useTypewriter) {
        startTypewriterEffect(step.content.description, setDisplayDescription);
      } else {
        // 不使用打字机效果，直接显示完整文本
        setDisplayDescription(step.content.description);
      }
    } else {
      setDisplayDescription('');
    }
    
    // 清理函数：清除定时器
    return () => {
      clearTypeInterval();
    };
  }, [step?.content?.description, useTypewriter]);

  // 音频播放逻辑
  useEffect(() => {
    // 检查是否有音频文件
    if (step && step.content && step.content.audio) {
      // 创建音频元素
      audioRef.current = new Audio(step.content.audio);
      // 播放音频
      audioRef.current.play().catch(error => {
        console.error('Audio playback failed:', error);
      });
    }

    // 清理函数：停止音频并清理资源
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        audioRef.current = null;
      }
    };
  }, [step?.content?.audio]);

  // 组件卸载时清除定时器
  useEffect(() => {
    return () => {
      clearTypeInterval();
    };
  }, []);

  return (
    <div
      className={`step-container story-step ${step && step.content && step.content.backgroundImage ? 'story-step--has-bg' : ''}`}
      style={
        step && step.content && step.content.backgroundImage
          ? { backgroundImage: `url(${step.content.backgroundImage})` }
          : undefined
      }
    >
      <div className="story-content story-content--overlay">
        {/* 场景描述 */}
        {step && step.content && step.content.description && (
          <div className="scene-description">
            <p>{displayDescription}</p>
          </div>
        )}

        {/* 对话内容 */}
        {hasDialogues && currentDialogue && (
          <div className="dialogue-container">
            {/* 角色立绘 */}
            {currentDialogue.avatar && (
              <div className="character-avatar">
                <img 
                  src={currentDialogue.avatar} 
                  alt={currentDialogue.characterName || ''} 
                />
              </div>
            )}
            {/* 对话框 */}
            <div className="dialogue-box">
              {/* 角色名称 */}
              {currentDialogue.characterName && (
                <div className="character-name">{currentDialogue.characterName}</div>
              )}
              {/* 对话文本 */}
              <div className="dialogue-text">{displayText}</div>
            </div>
          </div>
        )}
      </div>

      <div className="step-actions">
        <button className="step-button step-button-primary" onClick={handleNext}>
          {isTyping ? '跳过' : (hasDialogues && currentDialogueIndex < getDialogues().length - 1 ? '继续' : 'Next')}
        </button>
      </div>
    </div>
  );
};

export default StoryStep;