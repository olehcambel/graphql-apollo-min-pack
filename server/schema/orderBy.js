module.exports = `
enum UsersOrderBy {
  id_DESC
  id_ASC
  name_DESC
  name_ASC
  githubName_DESC
  githubName_ASC
  bio_DESC
  bio_ASC
  company_DESC
  company_ASC
  avatarUrl_DESC
  avatarUrl_ASC
  donatedAmount_DESC
  donatedAmount_ASC
  createdAt_DESC
  createdAt_ASC
}

enum DonatesOrderBy {
  id_DESC
  id_ASC
  title_DESC
  title_ASC
  date_DESC
  date_ASC
  description_DESC
  description_ASC
  amountAim_DESC
  amountAim_ASC
  amount_DESC
  amount_ASC
  completed_DESC
  completed_ASC
  createdAt_DESC
  createdAt_ASC
}
`;
