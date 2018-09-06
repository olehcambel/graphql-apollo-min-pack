const { gql } = require('apollo-server');
const User = require('./user');
const Donate = require('./donate');
const OrderBy = require('./orderBy');
const Filter = require('./filter');

const RootQuery = `
 type Query {
  users(limit: Int, offset: Int, orderBy: UsersOrderBy, filter: UsersFilter): [User]
  user(id: ID!): User
  donates(limit: Int, offset: Int, orderBy: DonatesOrderBy, filter: DonatesFilter): [Donate]
  donate(id: ID!): Donate
}
 `;

const Mutation = `
 type Mutation {
  donateAmount(donateId: ID!, donatorId: ID!, amount: Int!): Donate
  addDonate(title: String!, description: String, coverUrl: String, amountGoal: Int!, creatorId: ID!): Donate

  addUser(githubName: String!): User
}
 `;

module.exports = gql`
  ${RootQuery}
  ${Mutation}
  ${User}
  ${Donate}
  ${OrderBy}
  ${Filter}
`;
