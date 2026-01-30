export const flow2 = [
  {
    id: 'explore-intro',
    type: 'story',
    content: {
      title: '探索之旅',
      backgroundImage: '/image/story-intro-step1.jpg',
      dialogues: [
        {
          avatar: '/image/skylar-avatar.png',
          text: '准备好开始你的探索之旅了吗？',
          characterName: 'Skylar'
        }
      ]
    }
  },
  {
    id: 'explore-choice',
    type: 'choice',
    content: {
      title: '探索选择',
      question: '你想探索什么地方？',
      options: [
        {
          text: '山顶',
          nextStepId: 'explore-mountain'
        },
        {
          text: '洞穴',
          nextStepId: 'explore-cave'
        }
      ]
    }
  },
  {
    id: 'explore-mountain',
    type: 'story',
    content: {
      title: '山顶',
      backgroundImage: '/image/story-intro-step2.jpg',
      dialogues: [
        {
          avatar: '/image/skylar-avatar.png',
          text: '你到达了山顶，视野非常开阔！',
          characterName: 'Skylar'
        }
      ]
    }
  },
  {
    id: 'explore-cave',
    type: 'story',
    content: {
      title: '洞穴',
      backgroundImage: '/image/story-intro-step0.jpg',
      dialogues: [
        {
          avatar: '/image/skylar-avatar.png',
          text: '你进入了洞穴，里面有许多神秘的宝藏。',
          characterName: 'Skylar'
        }
      ]
    }
  }
];
