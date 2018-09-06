module.exports = `
type Donate {
  id: ID!
  title: String
  date: Float
  description: String
  coverUrl: String
  amountGoal: Int
  amount: Int
  completed: Boolean
  donators: [User]
  creator: User
}
`;
