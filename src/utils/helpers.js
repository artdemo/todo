export const turnQueryToObject = (query, initialObj = {}) => {
  if (!query.length) return initialObj;

  return query[0]
    .split(',')
    .reduce((obj, key) => ({ ...obj, [key]: true }), initialObj);
};

export const turnObjectToQuery = (object, queryKey, asString = true) => {
  const queryString = Object.keys(object)
    .filter((key) => object[key] && key)
    .join(',');

  if (queryString === '') return queryString;

  return asString ? `${queryKey}=${queryString}` : { [queryKey]: queryString };
};
