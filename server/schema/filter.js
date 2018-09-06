module.exports = `
#добавить возможные фильтры по всем типам
input UsersFilter {
  id_gt: ID
  id_gte: ID
  id_lt: ID
  id_lte: ID
  id_ne: ID
  id_eq: ID
  donatedAmount_between: [Int]
  donatedAmount_gt: Int
  donatedAmount_gte: Int
  donatedAmount_lt: Int
  donatedAmount_lte: Int
  donatedAmount_ne: Int
  donatedAmount_eq: Int
  donatedAmount_between: [Int]
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
  id_eq: ID
  amount_gt: Int
  amount_gte: Int
  amount_lt: Int
  amount_lte: Int
  amount_ne: Int
  amount_eq: Int
  amount_between: [Int]
  amountAim_gt: Int
  amountAim_gte: Int
  amountAim_lt: Int
  amountAim_lte: Int
  amountAim_ne: Int
  amountAim_eq: Int
  amountAim_between: [Int]
  title_iLike: String
  title_iLike_starts: String
  completed_eq: Boolean
}
`;
