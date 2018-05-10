const routes = require('next-routes')();

routes
  .add('/memories/new', 'memories/new')
  .add('/memories/show', 'memories/show')
  .add('/memories/:index/modify', 'memories/new');

module.exports = routes;