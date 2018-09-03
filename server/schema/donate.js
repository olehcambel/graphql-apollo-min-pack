module.exports = `
type Donate {
  id: Int!
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
