const mongoose = require('mongoose');
const { Schema } = mongoose;
const productScema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: { type: String, required: true },
  price: {
    type: Number,
    min: [1, 'wrong min price'],
    max: [50000, 'wrong max price'],
    required: true,
  },
  discountPercentage: {
    type: Number,
    min: [1, 'wrong min discountPercentage'],
    max: [100, 'wrong max discountPercentage'],
    required: true,
  },
  rating: {
    type: Number,
    min: [0, 'wrong min rating'],
    max: [5, 'wrong max rating'],
    required: true,
  },
  stock: {
    type: Number,
    min: [0, 'wrong min stock'],
    required: true,
  },
  brand: { type: String, required: true },
  category: { type: String, required: true },
  thumbnail: { type: String, required: true },
  images: { type: [String], required: true },
  deleted: { type: Boolean },
});
const virtual = productScema.virtual('id');
virtual.get(function () {
  return this._id;
});
productScema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});
exports.Product = mongoose.model('Product', productScema);
