'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Product Schema
 */
var ProductSchema = new Schema({
  category: {
    type: String,
    default: '',
    required: 'Please select category',
    trim: true
  },
  image: {
    type: String,
    default: ''
  },
  imageFile: {
    type: String,
    default: ''
  },
  name: {
    type: String,
    default: '',
    required: 'Please fill Product name',
    trim: true
  },
  description: {
    type: String,
    default: '',
    required: 'Please fill Product description',
    trim: true
  },
  tags: {
    type: String,
    default: '',
    trim: true
  },
  slug: {
    type: String,
    default: '',
    unique: true,
    trim: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Product', ProductSchema);
