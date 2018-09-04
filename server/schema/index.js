const { gql } = require('apollo-server');
const User = require('./user');
const Donate = require('./donate');

/**
 * Будет 2 схемы: Донат и Пользователи
 * Создается Донат по теме и необходимой суммой
 * дальше Пользователь вводит Гитхаб имя и сумму
 *
 * Выводится будут все Донаты
 * и Пользователи, с заДоначеной суммой и их Донаты
 */

const RootQuery = `
 type Query {
  users: [User]
  user(id: Int!): User
  donates: [Donate]
  donate(id: Int!): Donate
}
 `;

const Mutation = `
 type Mutation {
  donateAmount(donateId: Int!, donatorId: Int!, amount: Int!): Donate
  addDonate(title: String!, description: String, amountAim: Int!, creatorId: Int!): Donate

  addUser(githubName: String!): User
}
 `;

module.exports = gql`
  ${RootQuery}
  ${Mutation}
  ${User}
  ${Donate}
`;
