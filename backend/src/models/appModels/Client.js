const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  removed: {
    type: Boolean,
    default: false,
  },
  enabled: {
    type: Boolean,
    default: true,
  },
  userType: {
    type: String,
    enum: ['customer', 'seller', 'both'],
    default: 'customer'
  },
  name: {
    type: String,
    // removed: required: true
  },
  company: {
    type: String,
  },
  phone: String,
  country: String,
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },
  email: {
    type: String,
    unique: true,
    sparse: true
  },
  // For sellers
  businessInfo: {
    businessType: String,
    taxId: String,
    businessLicense: String,
    categories: [String],
    description: String
  },
  // For customers
  shippingAddresses: [{
    name: String,
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String,
    isDefault: {
      type: Boolean,
      default: false
    }
  }],
  wishlist: [{
    type: mongoose.Schema.ObjectId,
    ref: 'Quote' // We'll use Quote for products
  }],
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'Admin' },
  assigned: { type: mongoose.Schema.ObjectId, ref: 'Admin' },
  created: {
    type: Date,
    default: Date.now,
  },
  updated: {
    type: Date,
    default: Date.now,
  }
});

schema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model('Client', schema);
