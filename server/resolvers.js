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
    },
    operatorsAliases: Sequelize.Op
  }
);

// Example: remove in the next version
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

//   stars: { type: Sequelize.INTEGER, defaultValue: 0 },

const Op = Sequelize.Op;

const User = sequelize.define('user', {
  name: { type: Sequelize.STRING, defaultValue: '' },
  githubName: { type: Sequelize.STRING },
  bio: { type: Sequelize.STRING, defaultValue: '' },
  company: { type: Sequelize.STRING, defaultValue: '' },
  avatarUrl: { type: Sequelize.STRING, defaultValue: '' },
  donatedAmount: { type: Sequelize.INTEGER, defaultValue: 0 },
  donates: { type: Sequelize.ARRAY(Sequelize.INTEGER) }
});

const Donate = sequelize.define('donate', {
  title: { type: Sequelize.STRING },
  date: { type: Sequelize.FLOAT },
  description: { type: Sequelize.STRING },
  amountAim: { type: Sequelize.INTEGER, defaultValue: 0 },
  amount: { type: Sequelize.INTEGER, defaultValue: 0 },
  completed: { type: Sequelize.BOOLEAN, defaultValue: false },
  // creatorId: { type: Sequelize.INTEGER },
  creator: { type: Sequelize.INTEGER },
  donators: { type: Sequelize.ARRAY(Sequelize.INTEGER) }
});

// User.sync({ force: true }).then(async () => {
//   await User.create({
//     name: 'test',
//     githubName: 'githubName',
//     bio: 'gh.bio',
//     company: 'gh.company',
//     avatarUrl: 'gh.avatar_url',
//     donates: []
//   });
// });
// Donate.sync({ force: true }).then(async () => {
//   await Donate.create({
//     title: 'title',
//     date: Date.now(),
//     description: 'description',
//     amountAim: 0,
//     creator: 1,
//     donators: []
//   });
// });

User.sync();
Donate.sync();

module.exports = {
  Query: {
    users: () => User.findAll(),
    user: (_, { id }) => User.findById(id),

    donates: () => Donate.findAll(),
    donate: (_, { id }) => Donate.findById(id)
  },

  Mutation: {
    // ТОЛЬКО USER МОЖЕТ СОЗДАВАТЬ DONATE
    addDonate: async (_, { title, description, amountAim, creatorId }) => {
      try {
        const donate = await Donate.create({
          title,
          date: Date.now(),
          description,
          amountAim,
          creator: creatorId,
          donators: []
        });

        return donate;
      } catch (e) {
        throw new Error(e);
      }
    },

    addUser: async (_, { githubName }) => {
      try {
        const { data: gh } = await axios(
          `https://api.github.com/users/${githubName}`
        );

        const user = await User.create({
          name: gh.name,
          githubName,
          bio: gh.bio,
          company: gh.company,
          avatarUrl: gh.avatar_url,
          donates: []
        });

        return user;
      } catch (e) {
        throw new Error(e);
      }
    },

    donateAmount: async (_, { donateId, donatorId, amount }) => {
      try {
        let donate = await Donate.findById(donateId);
        let user = await User.findById(donatorId);

        if (!donate || !user) {
          throw new Error(`there is no id as ${donateId}`);
        }

        if (
          !donate.donators.length ||
          !donate.donators.find(id => id == user.id)
        ) {
          await donate.update({
            donators: [...donate.donators, user.id]
          });
        }

        if (!user.donates.length || !user.donates.find(id => id == donate.id)) {
          await user.update({
            donates: [...user.donates, donate.id]
          });
        }

        await donate.update({
          // donators: donate.id
          amount: (donate.amount += amount)
        });
        await user.update({
          donatedAmount: (user.donatedAmount += amount)
        });

        // why return only DONATE??
        // если вернет только для одной схемы, тогда в ней и буду менять данные
        // возможно вложенность мутирует и самого юзера
        return donate;
      } catch (e) {
        throw new Error(e);
      }
    }
  },

  User: {
    donates: donator =>
      Donate.findAll({
        where: {
          id: {
            [Op.or]: donator.donates
          }
        }
      })
  },

  Donate: {
    creator: donate => User.findById(donate.creator),
    donators: donate =>
      User.findAll({
        where: {
          id: {
            [Op.or]: donate.donators
          }
        }
      })
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