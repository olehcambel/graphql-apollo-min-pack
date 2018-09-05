module.exports = `
type Donate {
  id: ID!
  title: String
  date: Float
  description: String
  amountAim: Int
  amount: Int
  completed: Boolean
  donators: [User]
  creator: User
}
`;
