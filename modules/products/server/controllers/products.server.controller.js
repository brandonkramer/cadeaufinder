'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  fs = require('fs'),
  mongoose = require('mongoose'),
  Product = mongoose.model('Product'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Product
 */
exports.create = function(req, res) {
  var product = new Product(req.body);
  var user = req.user;
  product.user = req.user;


      product.save(function(err) {
        if (err) {
          return res.status(400).send({
            message: errorHandler.getErrorMessage(err)
          });
        } else {
          res.json(product);
        }
      });
};

/**
 * Update Product Picture
 */
exports.changeProductPicture = function (req, res) {
  var user = req.user;
  var product = new Product(req.body);

    fs.writeFile('./modules/products/client/img/products/uploads/' + product.image, req.files.file.buffer, function (uploadError) {
      if (uploadError) {
        return res.status(400).send({
          message: 'Error occurred while uploading profile picture'
        });
      }
    });
};


/**
 * Show the current Product
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var product = req.product ? req.product.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  product.isCurrentUserOwner = req.user && product.user && product.user._id.toString() === req.user._id.toString();

  res.jsonp(product);
};

/**
 * Update a Product
 */
exports.update = function(req, res) {
  var product = req.product;

  product = _.extend(product, req.body);

  product.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(product);
    }
  });
};

/**
 * Delete an Product
 */
exports.delete = function(req, res) {
  var product = req.product;
  if (product.image) {
    fs.unlink('./modules/products/client/img/products/uploads/'+product.imageFile);
  }
  product.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(product);
    }
  });
};

/**
 * List of Products
 */
exports.list = function(req, res) {
  Product.find().sort('-created').populate('user', 'displayName').exec(function(err, products) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(products);
    }
  });
};
/**
 * Find articles by slug
 */
exports.readBySlug = function(req , res){
    Product.findOne(req.query).populate('user',
    'displayName').exec(function(err, product) {
    if (err) {
        return res.status(400).send({
            message: errorHandler.getErrorMessage(err)
        });
        } else {
        res.json(product);
        }
    });
};

/**
 * Product middleware
 */
exports.productByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Product is invalid'
    });
  }

  Product.findById(id).populate('user', 'displayName').exec(function (err, product) {
    if (err) {
      return next(err);
    } else if (!product) {
      return res.status(404).send({
        message: 'No Product with that identifier has been found'
      });
    }
    req.product = product;
    next();
  });
};
