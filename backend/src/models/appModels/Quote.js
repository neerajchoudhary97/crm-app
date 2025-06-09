const mongoose = require('mongoose');

const quoteSchema = new mongoose.Schema({
  removed: {
    type: Boolean,
    default: false,
  },
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'Admin', autopopulate: true }, // `required: true` removed
  seller: { type: mongoose.Schema.ObjectId, ref: 'Client', autopopulate: true }, // `required: true` removed

  // Product specific fields
  productType: {
    type: String,
    enum: ['physical', 'digital', 'service'],
    // `required: true` removed
  },
  category: {
    type: String,
    // `required: true` removed
  },
  name: {
    type: String,
    // `required: true` removed
  },
  slug: {
    type: String,
    unique: true,
    // `required: true` removed
  },
  description: {
    type: String,
    // `required: true` removed
  },
  specifications: [{
    name: String,
    value: String
  }],
  images: [{
    url: String,
    public_id: String,
  }],
  
  // Original quote fields adapted for products
  number: {
    type: Number,
    // `required: true` removed
  },
  year: {
    type: Number,
    // `required: true` removed
  },
  date: {
    type: Date,
    default: Date.now,
    // `required: true` removed
  },
  expiredDate: {
    type: Date,
    // `required: true` removed
  },

  // Inventory and pricing
  stock: {
    type: Number,
    default: 0,
    // `required: true` removed
  },
  price: {
    type: Number,
    // `required: true` removed
  },
  discountedPrice: {
    type: Number,
  },
  taxRate: {
    type: Number,
    default: 0,
    // `required: true` removed
  },

  // Product status
  status: {
    type: String,
    enum: ['draft', 'published', 'out_of_stock', 'discontinued'],
    default: 'draft'
  },

  // Product variations
  variations: [{
    name: String, // e.g., "size", "color"
    options: [{
      name: String,
      price: Number,
      stock: Number,
      sku: String
    }]
  }],

  // SEO fields
  metaTitle: String,
  metaDescription: String,
  keywords: [String],

  // Ratings and reviews
  ratings: [{
    user: { type: mongoose.Schema.ObjectId, ref: 'Client', autopopulate: true },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      // `required: true` removed
    },
    review: String,
    date: {
      type: Date,
      default: Date.now
    }
  }],
  averageRating: {
    type: Number,
    default: 0
  },

  created: {
    type: Date,
    default: Date.now,
  },
  updated: {
    type: Date,
    default: Date.now,
  }
});

// Calculate average rating before saving
quoteSchema.pre('save', function(next) {
  if (this.ratings && this.ratings.length > 0) {
    this.averageRating = this.ratings.reduce((acc, item) => item.rating + acc, 0) / this.ratings.length;
  }
  next();
});

quoteSchema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model('Quote', quoteSchema);
