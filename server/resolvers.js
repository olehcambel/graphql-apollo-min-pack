const axios = require('axios');
require('dotenv').config({ path: './.env' });
const Sequelize = require('sequelize');
const filtrated = require('./helpers/filtrated');
const userDef = require('./db/userDef');
const donateDef = require('./db/donateDef');
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

const Op = Sequelize.Op;

const User = sequelize.define('user', {
  name: { type: Sequelize.STRING, defaultValue: '' },
  githubName: { type: Sequelize.STRING },
  bio: { type: Sequelize.STRING, defaultValue: '' },
  company: { type: Sequelize.STRING, defaultValue: '' },
  avatarUrl: {
    type: Sequelize.STRING,
    defaultValue:
      'https://yt3.ggpht.com/a-/ACSszfHXWBb_x1MUBtpuEa9xBBmFVuSRdvi02bquEQ=s900-mo-c-c0xffffffff-rj-k-no'
  },
  amountDonated: { type: Sequelize.INTEGER, defaultValue: 0 },
  donates: { type: Sequelize.ARRAY(Sequelize.INTEGER), defaultValue: [] }
});

const Donate = sequelize.define('donate', {
  title: { type: Sequelize.STRING },
  date: { type: Sequelize.FLOAT, defaultValue: Date.now() },
  coverUrl: {
    type: Sequelize.STRING,
    defaultValue:
      'https://marchforlife.ca/wp-content/uploads/2017/02/donate-1.jpg'
  },
  description: { type: Sequelize.STRING(1000), defaultValue: '' },
  amountGoal: { type: Sequelize.INTEGER },
  amount: { type: Sequelize.INTEGER, defaultValue: 0 },
  completed: { type: Sequelize.BOOLEAN, defaultValue: false },
  // creatorId: { type: Sequelize.INTEGER },
  creator: { type: Sequelize.INTEGER },
  donators: { type: Sequelize.ARRAY(Sequelize.INTEGER), defaultValue: [] }
});

// sequelize.sync({force: true}).then(async () => {

// })

// sequelize.sync({ force: true }).then(async () => {
//   const userRes = await userDef();
//   userRes.forEach(u => User.create(u));
//   donateDef.forEach(d => Donate.create(d));
// });

User.sync();
Donate.sync();

module.exports = {
  Query: {
    users: async (_, { limit, offset, orderBy, filter }) => {
      const {
        order,
        orderType,
        filterOp,
        filterType,
        filterCriteria
      } = filtrated(orderBy, filter);

      return await User.findAll({
        limit,
        offset,
        order: [[orderType, order]],
        where: {
          [filterType]: {
            [Op[filterOp]]: filterCriteria
          }
        }
      });
    },
    user: (_, { id }) => User.findById(id),

    donates: (_, { limit, offset, orderBy, filter }) => {
      const { order, orderType, filterStr } = filtrated(orderBy, filter);
      return Donate.findAll({
        limit,
        offset,
        order: [[orderType, order]],
        where: {
          ...filterStr
        }
      });
    },
    donate: (_, { id }) => Donate.findById(id)
  },

  Mutation: {
    addDonate: async (
      _,
      { title, description, coverUrl, amountGoal, creatorId }
    ) => {
      try {
        const donate = await Donate.create({
          title,
          date: Date.now(),
          description,
          coverUrl,
          amountGoal,
          creator: creatorId
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
          avatarUrl: gh.avatar_url
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

        // havent tested yet !!1
        // seems to be better to update everything at once

        (donate.amountGoal <= donate.amount &&
          !donate.completed &&
          (await donate.update({
            completed: true
          })))(
          // if(donate.amountGoal <= donate.amount && !donate.completed){
          //   await donate.update({
          //     completed: true
          //   });
          // }

          (!donate.donators.length ||
            !donate.donators.find(id => id == user.id)) &&
            (await donate.update({
              donators: [...donate.donators, user.id]
            }))
        );

        // if (
        //   !donate.donators.length ||
        //   !donate.donators.find(id => id == user.id)
        // ) {
        //   await donate.update({
        //     donators: [...donate.donators, user.id]
        //   });
        // }

        (!user.donates.length || !user.donates.find(id => id == donate.id)) &&
          (await user.update({
            donates: [...user.donates, donate.id]
          }));
        // if (!user.donates.length || !user.donates.find(id => id == donate.id)) {
        //   await user.update({
        //     donates: [...user.donates, donate.id]
        //   });
        // }

        await donate.update({
          // donators: donate.id
          amount: (donate.amount += amount)
        });
        await user.update({
          amountDonated: (user.amountDonated += amount)
        });

        // why return only DONATE??
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

/** Example
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
    amountGoal: 1000
    amount: 700
    donators: ['1', '2']
    donators: [
      {
        id: 1
        amountDonated: 200 = 150 + 50
      },
      {
        id: 2
        amountDonated: 500
      },
      
    ]
  }
]

User [
  {
    id: 1
    amountDonated: 200 = 150 + 50
    donates: ['2']
    donates: [
      {
        id: 2
        amountGoal: 1000
        amount: 700
      }
    ]
  },
  {
    id: 2
    amountDonated: 500
    donates: ['2']
    donates: [
      {
        id: 2
        amountGoal: 1000
        amount: 700
      }
    ]
  }
]
  */
