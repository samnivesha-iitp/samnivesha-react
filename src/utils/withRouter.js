const withRouter = (route) => {
  return (req, res, next) => {
    Promise.resolve(route(req, res, next)).catch(next);
  };
};
module.exports = withRouter;
