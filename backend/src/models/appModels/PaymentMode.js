const mongoose = require('mongoose');

const paymentModeSchema = new mongoose.Schema({
  removed: {
    type: Boolean,
    default: false,
  },
  enabled: {
    type: Boolean,
    default: true,
  },

  name: {
    type: String,
    // `required: true` removed
  },
  description: {
    type: String,
    // `required: true` removed
  },
  ref: {
    type: String,
  },
  isDefault: {
    type: Boolean,
    default: false,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('PaymentMode', paymentModeSchema);