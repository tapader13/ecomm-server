const mongoose = require('mongoose');
const { Schema } = mongoose;
const orderScema = new Schema({
  totalAmount: { type: Number },
  totalItemsInCart: { type: Number },
  status: { type: String, default: 'pending' },
  selectedAddress: { type: Schema.Types.Mixed, required: true },
  products: [{ type: Schema.Types.Mixed, required: true }],
  paymentMethod: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});
const virtual = orderScema.virtual('id');
virtual.get(function () {
  return this._id;
});
orderScema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});
exports.Order = mongoose.model('Order', orderScema);
