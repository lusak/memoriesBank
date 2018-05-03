const routes = require('next-routes')();

routes
  .add('/memories/new', 'memories/new')
  .add('/memories/:address', 'memories/show');
//   .add('/campaigns/:address/requests', '/campaigns/requests/index')
//   .add('/campaigns/:address/requests/new', '/campaigns/requests/new');

module.exports = routes;