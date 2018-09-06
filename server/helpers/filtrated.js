const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = (orderBy, filter) => {
  let [orderType, order] = ['createdAt', 'ASC'];

  if (orderBy) {
    [orderType, order] = orderBy.split('_');
    // [orderType, order] = orderBy.replace(/_/, '&').split('&')
  }
  let filterStr = {};
  if (filter) {
    for (let prop in filter) {
      let [type, op, pos] = prop.split('_');

      if (op == 'iLike') {
        filter[prop] =
          pos == 'starts' ? `${filter[prop]}%` : `%${filter[prop]}%`;
      }

      filterStr = {
        ...filterStr,
        [type]: { [Op[op]]: filter[prop] }
      };
    }
  } else {
    filterStr = {
      ['id']: { [Op.gt]: 0 }
    };
  }

  return { orderType, order, filterStr };
};
