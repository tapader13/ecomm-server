const mongoose = require('mongoose');
const { Schema } = mongoose;
const userScema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  role: { type: String, required: true, default: 'user' },
  password: { type: Buffer, required: true },
  addresses: { type: [Schema.Types.Mixed] },
  salt: Buffer,
});
const virtual = userScema.virtual('id');
virtual.get(function () {
  return this._id;
});
userScema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});
exports.User = mongoose.model('User', userScema);
