/**
 * 野外探索挑战 - 完整脚本数据
 */

// 0-5s: 故事背景
const step0_Intro = {
  type: 'story',
  title: '【任务开始】',
  content: '你们正在进行野外探索挑战，教授给了你们一个任务：找到隐藏在森林深处的神秘宝藏！',
  backgroundImage: '/image/story-intro-step0.jpg',
};

// 6-25s: 场景引入 (剧情叙事)
const step1_Scene = {
  type: 'story',
  title: '进入森林',
  content: 'Skylar: 这里的树木好高啊！\nUser: 我们需要指南针来确定方向。\n教授: 没错，指南针是野外探索的必备工具。',
  backgroundImage: '/image/story-intro-step1.png',
};

// 26-35s: 关键选择 (对话选读)
const step2_Choice = {
  type: 'choice',
  title: '选择路径',
  backgroundImage: '/image/story-intro-step2.jpg',
  description: '前方出现了两条路，你会选择哪一条？',
  options: [
    { id: 'left', label: '左边的小路', value: 'left' },
    { id: 'right', label: '右边的小路', value: 'right' },
  ],
  successValue: 'left',
  successNext: 4, // 跳到后续剧情
  failNext: 3,    // 跳到反馈重试
};

// 错误反馈
const step3_Feedback = {
  type: 'feedback',
  title: '选择错误',
  description: '教授摇了摇头：右边的小路看起来不安全，我们应该走左边。',
  backgroundImage: '/image/story-intro-step2.jpg',
  buttonText: '重新选择',
  next: 2 // 回到选择页
};

// 36-45s: 继续探索 (剧情叙事)
const step4_Processing = {
  type: 'story',
  title: '发现线索',
  content: 'Skylar: 看！树上有标记！\nUser: 这一定是指向宝藏的线索。\n教授: 很好，你们观察得很仔细。',
  backgroundImage: '/image/story-intro-step2.jpg',
};

// 46-56s: 选择朗读互动
const step5_PickRead = {
  type: 'pick-read',
  title: '识别植物',
  options: [
    { id: '1', label: '毒蘑菇', value: 'poison' },
    { id: '2', label: '可食用蘑菇', value: 'edible' },
  ],
  successValue: 'edible',
  successNext: 6,
  failNext: 6,
  audioUrl: '/audio/correct-answer.mp3',
};

// 57-65s: 广告/落地页
const step6_Ad = {
  type: 'ad',
  backgroundImage: '/image/story-intro-step6.jpg',
  highlightText: '',
  congratsText: '',
  description: '',
  ctaText: '',
  buttonText: '立即领取',
};

// 导出完整的流程数组
export const flow2 = [
  step0_Intro,      // 0
  step1_Scene,      // 1
  step2_Choice,     // 2
  step3_Feedback,   // 3
  step4_Processing, // 4
  step5_PickRead,   // 5
  step6_Ad          // 6
];
