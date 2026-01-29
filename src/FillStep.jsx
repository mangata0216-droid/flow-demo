import React, { useState } from 'react';
import './StepCommon.css';

/**
 * Fill 步骤组件
 * 用于填写表单/输入信息，支持 successNext / failNext 控制跳转（根据表单验证）
 * 
 * step 数据格式示例:
 * {
 *   type: 'fill',
 *   title: '请填写您的信息',
 *   description: '所有标记 * 的字段为必填项',
 *   fields: [
 *     { 
 *       id: 'name', 
 *       label: '姓名', 
 *       type: 'text', 
 *       required: true,
 *       placeholder: '请输入姓名'
 *     },
 *     {
 *       id: 'email',
 *       label: '邮箱',
 *       type: 'email',
 *       required: false,
 *       placeholder: '请输入邮箱'
 *     },
 *   ],
 *   successNext: 2, // 验证成功时跳转的步骤索引
 *   failNext: 3, // 验证失败时跳转的步骤索引
 * }
 */
const FillStep = ({ step, onNext, onPrevious }) => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  const handleFieldChange = (fieldId, value) => {
    setFormData((prev) => ({
      ...prev,
      [fieldId]: value,
    }));
    
    // 清除该字段的错误
    if (errors[fieldId]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[fieldId];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    step.fields?.forEach((field) => {
      if (field.required && !formData[field.id]) {
        newErrors[field.id] = `请输入${field.label}`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    const isValid = validateForm();
    
    // 验证失败时不继续
    if (!isValid) {
      return;
    }

    // 根据 successNext / failNext 决定跳转
    const nextStepIndex = step.successNext;

    // 将表单数据和下一步索引传递给回调
    onNext?.(
      {
        ...formData,
        success: isValid,
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

        <div className="fill-form">
          {step.fields?.map((field) => (
            <div key={field.id} className="fill-field">
              <label className="fill-label">
                {field.label}
                {field.required && <span className="required-mark">*</span>}
              </label>
              {field.type === 'textarea' ? (
                <textarea
                  className={`fill-input ${errors[field.id] ? 'error' : ''}`}
                  value={formData[field.id] || ''}
                  onChange={(e) => handleFieldChange(field.id, e.target.value)}
                  placeholder={field.placeholder}
                  rows={field.rows || 4}
                />
              ) : (
                <input
                  type={field.type || 'text'}
                  className={`fill-input ${errors[field.id] ? 'error' : ''}`}
                  value={formData[field.id] || ''}
                  onChange={(e) => handleFieldChange(field.id, e.target.value)}
                  placeholder={field.placeholder}
                />
              )}
              {errors[field.id] && (
                <span className="error-message">{errors[field.id]}</span>
              )}
            </div>
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
          下一步
        </button>
      </div>
    </div>
  );
};

export default FillStep;
