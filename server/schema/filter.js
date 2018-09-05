module.exports = `
#добавить возможные фильтры по всем типам
input UsersFilter {
  id_gt: ID
  id_gte: ID
  id_lt: ID
  id_lte: ID
  id_ne: ID
  donatedAmount_gt: Int
  donatedAmount_gte: Int
  donatedAmount_lt: Int
  donatedAmount_lte: Int
  donatedAmount_ne: Int
  name_iLike: String
  name_iLike_starts: String
  githubName_iLike: String
  githubName_iLike_starts: String
}

input DonatesFilter {
  id_gt: ID
  id_gte: ID
  id_lt: ID
  id_lte: ID
  id_ne: ID
  amount_gt: Int
  amount_gte: Int
  amount_lt: Int
  amount_lte: Int
  amount_ne: Int
  amountAim_gt: Int
  amountAim_gte: Int
  amountAim_lt: Int
  amountAim_lte: Int
  amountAim_ne: Int
  title_iLike: String
  title_iLike_starts: String
}
`;
