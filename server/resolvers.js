const axios = require('axios');
require('dotenv').config({ path: './.env' });
const Sequelize = require('sequelize');

const sequelize = new Sequelize(
  `postgres://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${
    process.env.DB_HOST
  }:5432/${process.env.DB}`,
  {
    ssl: true,
    dialectOptions: {
      ssl: true
    }
  }
);

const users = [
  {
    id: 1,
    name: 'Oleh',
    githubName: 'olehcambel',
    bio: null,
    company: 'undefined',
    avatarUrl: 'https://avatars2.githubusercontent.com/u/36879518?v=4',
    donatedAmount: 200,
    donates: [2]
  },
  {
    id: 2,
    name: 'Dan Abramov',
    githubName: 'gaearon',
    bio:
      'Working on @reactjs. Co-author of Redux and Create React App. Building tools for humans.',
    company: '@facebook',
    avatarUrl: 'https://avatars0.githubusercontent.com/u/810438?v=4',
    donatedAmount: 500,
    donates: [2]
  }
];

const donates = [
  {
    id: 1,
    title: 'Help rich people',
    date: 1535953733922,
    description: 'description for rich',
    amountAim: 1000,
    amount: 50,
    completed: false,
    creatorId: 1,
    donators: []
  },
  {
    id: 2,
    title: 'Help poor people',
    date: 1535953734922,
    description: 'description for poor',
    amountAim: 1000,
    amount: 700,
    completed: false,
    creatorId: 1,
    donators: [1, 2]
  }
];

// const Article = sequelize.define('frameworks', {
//   title: { type: Sequelize.STRING },
//   date: { type: Sequelize.STRING },
//   text: { type: Sequelize.STRING }
//   // comments: { type: Sequelize.ARRAY(Comment) }
// });

// const Comment = sequelize.define('comments', {
//   username: { type: Sequelize.STRING },
//   git: { type: Sequelize.STRING },
//   stars: { type: Sequelize.INTEGER, defaultValue: 0 },
//   description: { type: Sequelize.STRING, defaultValue: '' },
//   avatar: { type: Sequelize.STRING, defaultValue: '' },
//   date: { type: Sequelize.STRING },
//   text: { type: Sequelize.STRING },
//   article: { type: Sequelize.STRING }
// });

// Framework.sync({ force: true });
// Article.sync();
// Comment.sync();

module.exports = {
  Query: {
    users: () => users,
    user: (_, { id }) => users.find(user => user.id == id),

    donates: () => donates,
    donate: (_, { id }) => donates.find(donate => donate.id == id)

    //   articles: () => Article.findAll(),
    //   article: (_, params) => {
    //     const id = params.id;
    //     return articles.find(a => a.id == id);
    //   },
    //   comments: () => Comment.findAll(),
    //   comment: (_, params) => {
    //     const id = params.id;
    //     return comments.find(c => c.id == id);
    //   }
  },

  Mutation: {
    // ДОДЕЛАТЬ МУТАЦИЮ
    donateAmount: (_, { donateId, donatorId, amount }) => {
      let donate = donates.find(donate => donate.id == donateId);
      let user = users.find(user => user.id == donatorId);

      if (!donate || !user) {
        throw new Error(`there is no id as ${donateId}`);
      }

      if (
        !donate.donators.length ||
        !donate.donators.find(id => id == user.id)
      ) {
        // donate = { ...donate, donators: [...donate.donators, user.id] };
        donate.donators = [...donate.donators, user.id];
      }

      if (!user.donates.length || !user.donates.find(id => id == donate.id)) {
        // user = { ...user, donates: [...user.donates, donate.id] };
        user.donates = [...user.donates, donate.id];
      }

      donate.amount += amount;
      user.donatedAmount += amount;
      // why return only DONATE??
      return donate;
    }
  },

  User: {
    donates: donator =>
      donator.donates.map(id => donates.find(donate => donate.id == id))
  },

  Donate: {
    creator: donate => users.find(user => user.id == donate.creatorId),
    donators: donate =>
      donate.donators.map(id => users.find(user => user.id == id))
  }
};

/** Я не понимаю как мне делать поиск donates[Donate] + donators[User] 
 * user #1 donated 50 to donate #2
 * user #1 donated 150 to donate #2
 * user #2 donated 150 to donate #2
 * 
 * User(id: 1)
 *  name
 *  donates
 *    title
 * 
 * Oleh
 * donates: {'Help poor people'}
 * 
  
Donate [
  {
    id: 2
    amountAim: 1000
    amount: 700
    donators: ['1', '2']
    donators: [
      {
        id: 1
        donatedAmount: 200 = 150 + 50
      },
      {
        id: 2
        donatedAmount: 500
      },
      
    ]
  }
]

User [
  {
    id: 1
    donatedAmount: 200 = 150 + 50
    donates: ['2']
    donates: [
      {
        id: 2
        amountAim: 1000
        amount: 700
      }
    ]
  },
  {
    id: 2
    donatedAmount: 500
    donates: ['2']
    donates: [
      {
        id: 2
        amountAim: 1000
        amount: 700
      }
    ]
  }
]
  */
