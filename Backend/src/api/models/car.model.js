const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CarSchema = new Schema(
  {
    marca: { type: String, required: true },
    modelo: { type: String, required: true },
    color: { type: String, required: true },
    año: { type: Number, required: true },
    usuarios: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
  },
  {
    timestamps: true,
  }
);

const Car = mongoose.model('Car', CarSchema);
module.exports = Car;
