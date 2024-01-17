const mongoose = require('mongoose');
const { Schema } = mongoose;
const cartScema = new Schema({
  product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  quantity: { type: Number, required: true },
});
const virtual = cartScema.virtual('id');
virtual.get(function () {
  return this._id;
});
cartScema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});
exports.Cart = mongoose.model('Cart', cartScema);
