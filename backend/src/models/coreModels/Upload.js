const mongoose = require('mongoose');

const uploadSchema = new mongoose.Schema({
  removed: {
    type: Boolean,
    default: false,
  },
  enabled: {
    type: Boolean,
    default: true,
  },

  modelName: {
    type: String,
    trim: true,
  },
  fieldId: {
    type: String,
    // `required: true` removed
  },
  fileName: {
    type: String,
    // `required: true` removed
  },
  fileType: {
    type: String,
    enum: [
      'jpeg',
      'jpg',
      'png',
      'gif',
      'webp',
      'doc',
      'txt',
      'csv',
      'docx',
      'xls',
      'xlsx',
      'pdf',
      'zip',
      'rar',
      'mp4',
      'mov',
      'avi',
      'mp3',
      'm4a',
      'webm',
    ],
    // `required: true` removed
  },
  isPublic: {
    type: Boolean,
    default: false,
    // `required: true` removed
  },
  userID: {
    type: mongoose.SchemaTypes.ObjectId,
    // `required: true` removed
  },
  isSecure: {
    type: Boolean,
    // `required: true` removed
  },
  path: {
    type: String,
    // `required: true` removed
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Upload', uploadSchema);
