module.exports = `
type User {
  id: Int!
  name: String
  githubName: String
  bio: String
  company: String
  avatarUrl: String
  donatedAmount: Int
  donates: [Donate]
}
`;
