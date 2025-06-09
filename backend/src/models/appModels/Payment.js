const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  removed: {
    type: Boolean,
    default: false,
  },

  createdBy: { type: mongoose.Schema.ObjectId, ref: 'Admin', autopopulate: true },
  number: { type: Number },
  client: {
    type: mongoose.Schema.ObjectId,
    ref: 'Client',
    autopopulate: true,
  },
  invoice: {
    type: mongoose.Schema.ObjectId,
    ref: 'Invoice',
    autopopulate: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  amount: { type: Number },
  currency: {
    type: String,
    default: 'NA',
    uppercase: true,
  },
  paymentMode: {
    type: mongoose.Schema.ObjectId,
    ref: 'PaymentMode',
    autopopulate: true,
  },
  ref: {
    type: String,
  },
  description: {
    type: String,
  },
  updated: {
    type: Date,
    default: Date.now,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});
paymentSchema.plugin(require('mongoose-autopopulate'));
module.exports = mongoose.model('Payment', paymentSchema);
