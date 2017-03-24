'use strict';

/**
 * Module dependencies
 */
var productsPolicy = require('../policies/products.server.policy'),
  products = require('../controllers/products.server.controller');

module.exports = function(app) {
  // Products Routes
  app.route('/api/products/read-slug').get(productsPolicy.isAllowed ,
    products.readBySlug);

  app.route('/api/products/picture').all(productsPolicy.isAllowed)
    .post(products.changeProductPicture);

  app.route('/api/products').all(productsPolicy.isAllowed)
    .get(products.list)
    .post(products.create);

  app.route('/api/products/:productId').all(productsPolicy.isAllowed)
    .get(products.read)
    .put(products.update)
    .delete(products.delete);


  // Finish by binding the Product middleware
  app.param('productId', products.productByID);
};
