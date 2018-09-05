module.exports = `
type User {
  id: ID!
  name: String
  githubName: String
  bio: String
  company: String
  avatarUrl: String
  donatedAmount: Int
  donates: [Donate]
}
`;
