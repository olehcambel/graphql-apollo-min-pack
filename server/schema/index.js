const { gql } = require('apollo-server');
const User = require('./user');
const Donate = require('./donate');
const OrderBy = require('./orderBy');

const RootQuery = `
 type Query {
  # users( limit: Int, offset: Int): [User]
  users(limit: Int, offset: Int, orderBy: UsersOrderBy, after: Int): [User]
  user(id: Int!): User
  donates(limit: Int, offset: Int, orderBy: DonatesOrderBy, after: Int): [Donate]
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
  ${OrderBy}
`;
