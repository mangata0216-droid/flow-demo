/**
 * 野外烹饪挑战 - 完整脚本数据
 */

// 做饭游戏步骤
const step0_CookGame = {
  type: 'cook-game',
  title: '野外烹饪挑战',
  description: '输入食材单词，制作美味的食物！',
  pantryItems: [
    { id: 'tomato', name: 'Tomato', image: '/image/tomato.png' },
    { id: 'onion', name: 'Onion', image: '/image/onion.png' },
    { id: 'lettuce', name: 'Lettuce', image: '/image/lettuce.png' },
    { id: 'pasta', name: 'Pasta', image: '/image/pasta.png' },
    { id: 'cucumber', name: 'Cucumber', image: '/image/cucumber.png' },
    { id: 'apple', name: 'Apple', image: '/image/apple.png' }
  ],
  recipes: [
    {
      id: 'tomato-pasta',
      name: 'Tomato Pasta',
      ingredients: ['tomato', 'onion', 'pasta'],
      image: '/image/tomato-pasta.png'
    },
    {
      id: 'green-salad',
      name: 'Green Salad',
      ingredients: ['lettuce', 'tomato', 'cucumber'],
      image: '/image/green-salad.png'
    }
  ]
};

// 广告/落地页
const step1_Ad = {
  type: 'ad',
  backgroundImage: '/image/story-intro-step6.jpg',
  highlightText: '',
  congratsText: '',
  description: '',
  ctaText: '',
  buttonText: '立即领取',
};

// 导出完整的流程数组
export const flow3 = [
  step0_CookGame,   // 0
  step1_Ad          // 1
];
