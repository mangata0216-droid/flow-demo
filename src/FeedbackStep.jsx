import React, { useState } from 'react';
import './StepCommon.css';

/**
 * Feedback 步骤组件
 * 用于收集反馈/评价，支持 successNext / failNext 控制跳转（根据评分）
 * 
 * step 数据格式示例:
 * {
 *   type: 'feedback',
 *   title: '请提供您的反馈',
 *   rating: true, // 是否显示评分
 *   comment: true, // 是否显示评论框
 *   ratingLabel: '满意度',
 *   commentLabel: '其他意见',
 *   minRating: 3, // 最低评分阈值（可选）
 *   successNext: 2, // 成功时跳转的步骤索引
 *   failNext: 3, // 失败时跳转的步骤索引
 * }
 */
const FeedbackStep = ({ step, onNext, onPrevious }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleRatingClick = (value) => {
    setRating(value);
  };

  // 判断反馈是否成功（基于评分）
  const isSuccess = () => {
    if (step.rating && step.minRating !== undefined) {
      return rating >= step.minRating;
    }
    // 如果没有设置 minRating，默认视为成功
    return true;
  };

  const handleNext = () => {
    // 如果要求评分但未评分
    if (step.rating && rating === 0) {
      alert('请先进行评分');
      return;
    }

    const feedbackData = {
      rating: step.rating ? rating : undefined,
      comment: step.comment ? comment : undefined,
    };

    // 根据 successNext / failNext 决定跳转
    const success = isSuccess();
    const nextStepIndex = success ? step.successNext : step.failNext;

    // 将反馈数据和下一步索引传递给回调
    onNext?.(
      {
        ...feedbackData,
        success,
        nextStepIndex,
      },
      step
    );
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

        {step.rating && (
          <div className="feedback-rating">
            <label className="feedback-label">
              {step.ratingLabel || '评分'}
            </label>
            <div className="rating-stars">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  className={`rating-star ${rating >= value ? 'filled' : ''}`}
                  onClick={() => handleRatingClick(value)}
                  aria-label={`${value} 星`}
                >
                  ★
                </button>
              ))}
            </div>
            {rating > 0 && (
              <span className="rating-value">{rating} / 5</span>
            )}
          </div>
        )}

        {step.comment && (
          <div className="feedback-comment">
            <label className="feedback-label">
              {step.commentLabel || '评论'}
            </label>
            <textarea
              className="fill-input"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="请输入您的反馈..."
              rows={4}
            />
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
          提交
        </button>
      </div>
    </div>
  );
};

export default FeedbackStep;
