const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
  removed: {
    type: Boolean,
    default: false,
  },

  createdBy: { type: mongoose.Schema.ObjectId, ref: 'Admin' },
  number: { type: Number },
  year: { type: Number },

  // Order specific fields
  orderType: {
    type: String,
    enum: ['regular', 'subscription', 'pre_order'],
    default: 'regular'
  },
  customer: {
    type: mongoose.Schema.ObjectId,
    ref: 'Client',
    autopopulate: true,
  },
  orderStatus: {
    type: String,
    enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded'],
    default: 'pending'
  },
  shippingAddress: {
    name: String,
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String,
    phone: String
  },
  billingAddress: {
    name: String,
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String,
    phone: String
  },
  shippingMethod: {
    name: String,
    provider: String,
    trackingNumber: String,
    estimatedDelivery: Date,
    cost: Number
  },
  items: [
    {
      product: {
        type: mongoose.Schema.ObjectId,
        ref: 'Quote',
        autopopulate: true
      },
      variation: {
        name: String,
        option: String
      },
      quantity: Number,
      price: Number,
      tax: {
        type: Number,
        default: 0,
      },
      discount: {
        type: Number,
        default: 0,
      },
      total: Number,
    },
  ],
  
  // Payment information
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'partially_paid', 'refunded', 'failed'],
    default: 'pending'
  },
  paymentMethod: {
    type: String,
    enum: ['credit_card', 'paypal', 'bank_transfer', 'cash_on_delivery'],
  },
  currency: {
    type: String,
    default: 'USD',
    uppercase: true,
  },

  // Totals
  subtotal: Number,
  taxTotal: {
    type: Number,
    default: 0,
  },
  shippingCost: {
    type: Number,
    default: 0,
  },
  discount: {
    type: Number,
    default: 0,
  },
  total: Number,

  // Additional information
  notes: String,
  customerNotes: String,
  privateNotes: String,

  created: {
    type: Date,
    default: Date.now,
  },
  updated: {
    type: Date,
    default: Date.now,
  }
});

// Calculate totals before saving
invoiceSchema.pre('save', function(next) {
  this.subtotal = this.items.reduce((acc, item) => acc + item.total, 0);
  this.total = this.subtotal + this.taxTotal + this.shippingCost - this.discount;
  next();
});

invoiceSchema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model('Invoice', invoiceSchema);
