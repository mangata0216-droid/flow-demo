/**
 * 拯救受伤飞行员 - 完整脚本数据
 * 严格对应图 2 交互逻辑
 */

// 0-5s: 故事背景
const step0_Intro = {
  type: 'story',
  title: '【任务开始】',
  content: '你们正在进行野外探索挑战，突然听到飞船坠落的巨响！教授喊道：快！救人！',
  backgroundImage: '/image/story-intro-step0.jpg',
};

// 6-25s: 场景引入 (剧情叙事)
const step1_Scene = {
  type: 'story',
  title: '抵达现场',
  content: 'Skylar: 有人受伤了！\nUser: Medic! 扫描受伤的人！\nMedic: 收到，正在扫描...',
  backgroundImage: '/image/story-intro-step1.png',
};

// 26-35s: 关键选择 (对话选读)
const step2_Choice = {
  type: 'choice',
  title: '识别伤情',
  backgroundImage: '/image/story-intro-step2.jpg',
  description: 'Medic: 我的腿伤得更重。User: 看！哪里有血？',
  options: [
    { id: 'leg', label: 'Leg blood (腿部出血)', value: 'leg' },
    { id: 'arm', label: 'Arm blood (手臂出血)', value: 'arm' },
  ],
  successValue: 'leg',
  successNext: 4, // 跳到后续剧情
  failNext: 3,    // 跳到反馈重试
};

// 错误反馈
const step3_Feedback = {
  type: 'feedback',
  title: '观察不仔细',
  description: 'Medic 摇了摇头：伤口主要在腿部，请重新观察。',
  backgroundImage: '/image/story-intro-step2.jpg',
  buttonText: '重新观察',
  next: 2 // 回到选择页
};

// 36-45s: 扫描处理 (剧情叙事)
const step4_Processing = {
  type: 'story',
  title: '正在止血',
  content: 'Medic: 别怕，我来处理！扫描动画运行中...',
  backgroundImage: '/image/story-intro-step2.jpg',
};

// 46-56s: 挖空互动 (巩固练习)
const step5_Fill = {
  type: 'fill',
  title: '救助 Adam',
  description: 'Adam: 谢谢你们救了我！我的腿好痛！',
  backgroundImage: '/image/story-intro-step2.jpg',
  fields: [
    {
      id: 'hurt_word',
      label: 'Your leg is ____!',
      type: 'text',
      placeholder: '填写：hurt',
      required: true,
      correctAnswer: 'hurt' 
    }
  ],
  successNext: 6
};

// 46-56s: 选择朗读互动互动
const stepPickRead = {
  type: 'pick-read',
  backgroundImage: '/image/story-intro-step2.jpg',
  title: '请选择正确答案',
  options: [
    { id: '1', label: '请选我，我是正确答案', value: 'a' },
    { id: '2', label: '别选我，我害羞', value: 'b' },
  ],
  successValue: 'a',
  successNext: 7,
  failNext: 7,
  audioUrl: '/audio/correct-answer.mp3', // 音频文件路径
};


// 57-65s: 广告/落地页
const step7_Ad = {
  type: 'ad',
  backgroundImage: '/image/story-intro-step6.jpg',
  highlightText: '',
  congratsText: '',
  description: '',
  ctaText: '',
  buttonText: '立即领取',
};

// 导出完整的流程数组
export const flow1 = [
  step0_Intro,      // 0
  step1_Scene,      // 1
  step2_Choice,     // 2
  step3_Feedback,   // 3
  step4_Processing, // 4
  step5_Fill,       // 5
  stepPickRead,     // 6
  step7_Ad          // 7
];
