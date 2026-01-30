import React, { useState, useEffect } from 'react';
import './CookGameStep.css';

/**
 * 做饭游戏步骤组件
 * 用于实现做饭游戏的核心功能
 * 
 * step 数据格式示例:
 * {
 *   type: 'cook-game',
 *   title: '做饭游戏',
 *   description: '输入食材单词，制作美味的食物！',
 *   pantryItems: [
 *     { id: 'tomato', name: 'Tomato', image: '/image/tomato.png' },
 *     { id: 'onion', name: 'Onion', image: '/image/onion.png' },
 *     { id: 'lettuce', name: 'Lettuce', image: '/image/lettuce.png' },
 *     { id: 'pasta', name: 'Pasta', image: '/image/pasta.png' },
 *     { id: 'cucumber', name: 'Cucumber', image: '/image/cucumber.png' },
 *     { id: 'apple', name: 'Apple', image: '/image/apple.png' }
 *   ],
 *   recipes: [
 *     {
 *       id: 'tomato-pasta',
 *       name: 'Tomato Pasta',
 *       ingredients: ['tomato', 'onion', 'pasta'],
 *       image: '/image/tomato-pasta.png'
 *     },
 *     {
 *       id: 'green-salad',
 *       name: 'Green Salad',
 *       ingredients: ['lettuce', 'tomato', 'cucumber'],
 *       image: '/image/green-salad.png'
 *     },
 *     {
 *       id: 'beef-burger',
 *       name: 'Beef Burger',
 *       ingredients: ['beef', 'bun', 'lettuce'],
 *       image: '/image/beef-burger.png'
 *     },
 *     {
 *       id: 'strawberry-cake',
 *       name: 'Strawberry Cake',
 *       ingredients: ['strawberry', 'flour', 'egg'],
 *       image: '/image/strawberry-cake.png'
 *     }
 *   ]
 * }
 */
const CookGameStep = ({ step, onNext }) => {
  // 状态管理
  const [ingredients, setIngredients] = useState(['', '', '']);
  const [showCollection, setShowCollection] = useState(false);
  const [activeTab, setActiveTab] = useState('pantry');
  const [unlockedRecipes, setUnlockedRecipes] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState({ success: false, message: '', recipe: null });
  const [inputValue, setInputValue] = useState('');

  // 模拟已解锁的食谱
  useEffect(() => {
    // 这里可以从本地存储或其他地方加载已解锁的食谱
    // 暂时使用空数组
  }, []);

  // 处理食材输入变化
  const handleIngredientChange = (index, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = value.toLowerCase();
    setIngredients(newIngredients);
  };

  // 处理输入框变化
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  // 添加食材
  const handleAddIngredient = () => {
    // 找到第一个空的食材位置
    const emptyIndex = ingredients.findIndex(ingredient => ingredient.trim() === '');
    if (emptyIndex !== -1) {
      const newIngredients = [...ingredients];
      newIngredients[emptyIndex] = inputValue.toLowerCase().trim();
      setIngredients(newIngredients);
      setInputValue('');
    }
  };

  // 检查是否可以开始做饭
  const canCook = ingredients.every(ingredient => ingredient.trim() !== '');

  // 检查食材是否在 pantry 中
  const isValidIngredient = (ingredient) => {
    return step.pantryItems?.some(item => item.id === ingredient.toLowerCase());
  };

  // 开始做饭
  const handleCook = () => {
    // 检查所有食材是否有效
    const allValid = ingredients.every(isValidIngredient);
    
    if (!allValid) {
      setResult({
        success: false,
        message: 'Some ingredients are not in your pantry!',
        recipe: null
      });
      setShowResult(true);
      return;
    }

    // 检查是否匹配任何食谱
    const matchedRecipe = step.recipes?.find(recipe => {
      const recipeIngredients = recipe.ingredients.map(ing => ing.toLowerCase());
      return JSON.stringify(ingredients.sort()) === JSON.stringify(recipeIngredients.sort());
    });

    if (matchedRecipe) {
      // 做饭成功
      const newUnlockedRecipes = [...unlockedRecipes];
      if (!newUnlockedRecipes.includes(matchedRecipe.id)) {
        newUnlockedRecipes.push(matchedRecipe.id);
        setUnlockedRecipes(newUnlockedRecipes);
      }
      
      setResult({
        success: true,
        message: `Congratulations! You made ${matchedRecipe.name}!`,
        recipe: matchedRecipe
      });
    } else {
      // 做饭失败
      setResult({
        success: false,
        message: 'Sorry, your recipe doesn\'t match any known dish!',
        recipe: null
      });
    }
    
    setShowResult(true);
  };

  // 处理弹窗按钮点击
  const handlePopupButtonClick = () => {
    setShowResult(false);
    // 衔接广告页，和 adstep 一致
    onNext?.(null, step);
  };

  // 关闭收藏面板
  const handleCloseCollection = () => {
    setShowCollection(false);
  };

  return (
    <div className="step-container cook-game-step">
      <div className="cook-game-header">
        <h2>COOKING</h2>
        <button className="collection-button" onClick={() => setShowCollection(true)}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 19.5C4 18.837 4.26339 18.2011 4.73223 17.7322C5.20107 17.2634 5.83696 17 6.5 17H20" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M6.5 2H20V22H6.5C5.83696 22 5.20107 21.7366 4.73223 21.2678C4.26339 20.7989 4 20.163 4 19.5V4.5C4 3.83696 4.26339 3.20107 4.73223 2.73223C5.20107 2.26339 5.83696 2 6.5 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      <div className="cook-game-content">
        {/* 锅的图片 */}
        <div className="pot-container">
          <div className="pot">
            <div className="pot-lid"></div>
            <div className="pot-body"></div>
          </div>
          {/* 食材显示 */}
          <div className="ingredients-in-pot">
            {ingredients.map((ingredient, index) => (
              ingredient && (
                <div key={index} className="ingredient-in-pot">
                  {ingredient}
                </div>
              )
            ))}
          </div>
        </div>

        {/* 食材方块 */}
        <div className="ingredient-blocks">
          {ingredients.map((ingredient, index) => (
            <div 
              key={index} 
              className={`ingredient-block ${index === 0 ? 'active' : ''}`}
            >
              <div className="block-content">
                {ingredient ? (
                  <span className="ingredient-text">{ingredient}</span>
                ) : (
                  <span className="add-icon">{index === 0 ? '+' : '+'}</span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* 食材输入区域 */}
        <div className="ingredients-input">
          <div className="input-group">
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Add ingredient..."
              className="ingredient-input"
            />
            <button 
              className="add-button" 
              onClick={handleAddIngredient}
            >
              ADD
            </button>
          </div>
          
          <button 
            className="cook-button" 
            onClick={handleCook}
            disabled={!canCook}
          >
            Start Cooking
          </button>
        </div>
      </div>

      {/* 收藏面板 */}
      {showCollection && (
        <div className="collection-panel">
          <div className="collection-header">
            <h3>Collection</h3>
            <button className="close-button" onClick={handleCloseCollection}>×</button>
          </div>
          
          <div className="collection-tabs">
            <button 
              className={`tab-button ${activeTab === 'pantry' ? 'active' : ''}`}
              onClick={() => setActiveTab('pantry')}
            >
              Pantry
            </button>
            <button 
              className={`tab-button ${activeTab === 'cookbook' ? 'active' : ''}`}
              onClick={() => setActiveTab('cookbook')}
            >
              Cookbook
            </button>
          </div>

          <div className="collection-content">
            {/* Pantry 标签内容 */}
            {activeTab === 'pantry' && (
              <div className="pantry-content">
                <div className="pantry-grid">
                  {step.pantryItems?.map((item) => (
                    <div key={item.id} className="pantry-item">
                      <div className="pantry-item-image">
                        {item.image ? (
                          <img src={item.image} alt={item.name} />
                        ) : (
                          <div className="placeholder-image">{item.name.charAt(0)}</div>
                        )}
                      </div>
                      <div className="pantry-item-name">{item.name}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Cookbook 标签内容 */}
            {activeTab === 'cookbook' && (
              <div className="cookbook-content">
                {step.recipes?.map((recipe) => {
                  const isUnlocked = unlockedRecipes.includes(recipe.id);
                  return (
                    <div key={recipe.id} className="recipe-item">
                      <div className="recipe-image">
                        {isUnlocked ? (
                          <img src={recipe.image} alt={recipe.name} />
                        ) : (
                          <div className="locked-image">?</div>
                        )}
                      </div>
                      <div className="recipe-info">
                        <div className="recipe-name">
                          {isUnlocked ? recipe.name : '???'}
                        </div>
                        <div className="recipe-ingredients">
                          {isUnlocked ? (
                            recipe.ingredients.map((ingredient, index) => (
                              <span key={index} className="recipe-ingredient">
                                {ingredient}
                                {index < recipe.ingredients.length - 1 && ', '}
                              </span>
                            ))
                          ) : (
                            <span className="locked-ingredients">??? ??? ???</span>
                          )}
                        </div>
                      </div>
                      <div className="recipe-lock">
                        {!isUnlocked && <span className="lock-icon">🔒</span>}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* 结果弹窗 */}
      {showResult && (
        <div className="result-popup">
          <div className="result-content">
            <h3>{result.success ? 'Success!' : 'Failed'}</h3>
            <p>{result.message}</p>
            {result.success && result.recipe && (
              <div className="success-recipe">
                <img src={result.recipe.image} alt={result.recipe.name} className="recipe-image-small" />
                <div className="recipe-details">
                  <div className="recipe-name">{result.recipe.name}</div>
                  <div className="recipe-ingredients">
                    {result.recipe.ingredients.join(', ')}
                  </div>
                </div>
              </div>
            )}
            <button className="ad-button" onClick={handlePopupButtonClick}>
              Continue
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CookGameStep;