const mongoose = require('mongoose');
const { Schema } = mongoose;
const brandScema = new Schema({
  value: {
    type: String,
    required: true,
    unique: true,
  },
  label: { type: String, required: true, unique: true },

  checked: { type: Boolean, required: true },
});
const virtual = brandScema.virtual('id');
virtual.get(function () {
  return this._id;
});
brandScema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});
exports.Brand = mongoose.model('Brand', brandScema);
