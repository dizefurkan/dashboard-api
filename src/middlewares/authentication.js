export default (req, res, next) => {
  // do something for control authentication
  // FIXME
  const isHaveAccess = true;

  if (isHaveAccess) next();
  else {
    // do something here for not permitted endpoints
  }
};
