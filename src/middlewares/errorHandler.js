export default (err, req, res, next) => { // eslint-disable-line
  console.log('err', err); // eslint-disable-line
  res.send({ error: err });
};
