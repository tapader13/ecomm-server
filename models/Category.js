const mongoose = require('mongoose');
const { Schema } = mongoose;
const categoryScema = new Schema({
  value: {
    type: String,
    required: true,
    unique: true,
  },
  label: { type: String, required: true, unique: true },

  checked: { type: Boolean, required: true },
});
const virtual = categoryScema.virtual('id');
virtual.get(function () {
  return this._id;
});
categoryScema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});
exports.Categorie = mongoose.model('Categorie', categoryScema);
