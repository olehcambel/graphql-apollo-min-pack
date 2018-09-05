module.exports = (orderBy, filter) => {
  let [orderType, order] = ['createdAt', 'ASC'];
  let [filterType, filterOp, filterCriteria] = ['id', 'gt', 0];

  if (orderBy) {
    [orderType, order] = orderBy.split('_');
    // [orderType, order] = orderBy.replace(/_/, '&').split('&')
  }
  if (filter) {
    [_filter, filterCriteria] = Object.entries(filter)[0];
    [filterType, filterOp, pos] = _filter.split('_');

    if (filterOp == 'iLike') {
      filterCriteria =
        pos == 'starts' ? `${filterCriteria}%` : `%${filterCriteria}%`;
    }
  }

  return { orderType, order, filterType, filterOp, filterCriteria };
};
