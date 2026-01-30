export const flow1 = [
  {
    id: 'story-intro',
    type: 'story',
    content: {
      title: '瓦拉飞船',
      backgroundImage: '/image/spaceship.png',
      useTypewriter: true,
      description: 'Hi little Pioneer, you\'re going to Planet Vala! There are many new friends on the spaceship! Now, go and see who they are!',
      audio: '/audio/story1.mp3'
    }
  },
  {
    id: 'spaceship-door',
    type: 'choice',
    title: '飞船门',
    question: '"打开" the door of the spaceship.',
    backgroundImage: '/image/spaceship.png',
    options: [
      {
        value: 'open',
        label: 'open'
      },
      {
        value: 'close',
        label: 'close'
      }
    ],
    successValue: 'open',
    successNext: 3,
    failNext: 2
  },
  {
    id: 'close-feedback',
    type: 'story',
    content: {
      title: '提示',
      backgroundImage: '/image/spaceship.png',
      description: 'close:关闭，请重试'
    },
    next: 1
  },
  {
    id: 'meet-rebecca',
    type: 'story',
    content: {
      title: '遇见Rebecca',
      backgroundImage: '/image/spaceship.png',
      dialogues: [
        {
          avatar: '/image/chr3.png',
          text: 'Another one! Hi, hello there!',
          characterName: 'Rebecca'
        },
        {
          avatar: '/image/user-avatar.png',
          text: 'Ah! Hello.',
          characterName: 'I'
        },
        {
          avatar: '/image/chr3.png',
          text: 'My name is Rebecca. What\'s your name?',
          characterName: 'Rebecca'
        }
      ]
    }
  },
  {
    id: 'introduce-yourself',
    type: 'pick-read',
    title: '自我介绍',
    question: '选择介绍自己的表达',
    backgroundImage: '/image/spaceship.png',
    options: [
      {
        value: 'lily',
        label: 'My name is Lily.'
      },
      {
        value: 'tom',
        label: 'My name is Tom.'
      }
    ],
    successValue: 'lily'
  },
  {
    id: 'post-introduction',
    type: 'story',
    content: {
      title: '友好交流',
      backgroundImage: '/image/spaceship.png',
      dialogues: [
        {
          avatar: '/image/chr3.png',
          text: 'Nice to meet you too!',
          characterName: 'Rebecca'
        },
        {
          avatar: '/image/user-avatar.png',
          text: 'Nice to meet you too.',
          characterName: 'I'
        }
      ]
    }
  },
  {
    id: 'meet-otis',
    type: 'story',
    content: {
      title: '遇见Otis',
      backgroundImage: '/image/spaceship.png',
      dialogues: [
        {
          avatar: '/image/chr4.png',
          text: 'Hello, xx. I\'m Otis!',
          characterName: 'Otis'
        },
        {
          avatar: '/image/user-avatar.png',
          text: 'Hello, Otis!',
          characterName: 'Me'
        },
        {
          avatar: '/image/chr4.png',
          text: 'I really like robots.',
          characterName: 'Otis'
        },
        {
          avatar: '/image/chr4.png',
          text: 'Look, this is the robot I made!',
          characterName: 'Otis'
        },
        {
          avatar: '/image/user-avatar.png',
          text: 'That\'s so cool!',
          characterName: 'Me'
        },
        {
          avatar: '/image/chr4.png',
          text: 'What are you good at?',
          characterName: 'Otis'
        }
      ]
    }
  },
  {
    id: 'what-are-you-good-at',
    type: 'choice',
    title: '擅长什么',
    question: 'I ____ reading and thinking.',
    backgroundImage: '/image/spaceship.png',
    options: [
      {
        value: 'are good at',
        label: 'are good at'
      },
      {
        value: 'am good at',
        label: 'am good at'
      },
      {
        value: 'am good in',
        label: 'am good in'
      }
    ],
    successValue: 'am good at',
    optionNext: {
      'are good at': 8,
      'am good at': 10,
      'am good in': 8
    }
  },
  {
    id: 'are-good-at-feedback',
    type: 'story',
    content: {
      title: '反馈',
      backgroundImage: '/image/spaceship.png',
      dialogues: [
        {
          avatar: '/image/chr4.png',
          text: 'That\'s interesting, but I asked what you are good at doing.',
          characterName: 'Otis'
        }
      ]
    },
    next: 7
  },
  {
    id: 'am-good-in-feedback',
    type: 'story',
    content: {
      title: '反馈',
      backgroundImage: '/image/spaceship.png',
      dialogues: [
        {
          avatar: '/image/chr4.png',
          text: 'Oh, that\'s a useful skill too!',
          characterName: 'Otis'
        }
      ]
    },
    next: 10
  },
  {
    id: 'success-feedback',
    type: 'story',
    content: {
      title: '成功反馈',
      backgroundImage: '/image/spaceship.png',
      dialogues: [
        {
          avatar: '/image/chr3.png',
          text: 'Great job! You got it right!',
          characterName: 'Otis'
        },
        {
          avatar: '/image/chr3.png',
          text: 'Reading and thinking are important skills!',
          characterName: 'Otis'
        },
        {
          avatar: '/image/user-avatar.png',
          text: 'Thank you!',
          characterName: 'Me'
        }
      ]
    }
  },
  {
    id: 'fasten-seatbelts',
    type: 'story',
    content: {
      title: '系好安全带',
      backgroundImage: '/image/spaceship.png',
      dialogues: [
        {
          avatar: '/image/chr3.png',
          text: 'Quick! Let\'s sit down now!',
          characterName: 'Rebecca'
        },
        {
          avatar: '/image/chr3.png',
          text: 'Come and sit with me!',
          characterName: 'Otis'
        },
        {
          avatar: '/image/chr3.png',
          text: 'Fasten your seatbelts!',
          characterName: 'Otis'
        },
        {
          avatar: '/image/user-avatar.png',
          text: 'Okay!',
          characterName: 'User'
        }
      ]
    }
  },
  {
    id: 'fasten-seatbelt-choice',
    type: 'choice',
    title: '系好安全带',
    question: '"系好" the seatbelt.',
    backgroundImage: '/image/spaceship.png',
    options: [
      {
        value: 'fasten',
        label: 'fasten'
      },
      {
        value: 'unfasten',
        label: 'unfasten'
      }
    ],
    successValue: 'fasten'
  },
  {
    id: 'spaceship-launch',
    type: 'story',
    content: {
      title: '飞船发射',
      backgroundImage: '/image/spaceship.png',
      description: '飞船发射！'
    }
  },
  {
    id: 'ad-step',
    type: 'ad',
    content: {
      title: '广告',
      backgroundImage: '/image/admakefriends.png',
      description: '感谢使用我们的应用！希望你喜欢这次太空之旅！'
    },
    buttonText: '领取奖励'
  }
];