const withRouter = route => (req, res, next) =>
  Promise.resolve(route(req, res)).catch(next);
module.exports = withRouter;
