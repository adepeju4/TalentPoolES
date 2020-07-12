/* eslint-disable arrow-body-style */
// Catch Error in Async Function
module.exports = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};
