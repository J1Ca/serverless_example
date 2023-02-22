const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  offerId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Offer",
      required: true,
    },
  ],
  considerationId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Consideration",
      required: true,
    },
  ],
  offerer: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  signature: {
    type: String,
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
  counter: {
    type: Number,
    required: true,
  },
  salt: {
    type: String,
    required: true,
  },
  conduitKey: {
    type: String,
    required: true,
  },
  zone: {
    type: String,
    required: true,
  },
  zoneHash: {
    type: String,
    required: true,
  },
  numerator: {
    type: Number,
    required: true,
  },
  denominator: {
    type: Number,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  orderCode: {
    type: String,
    required: true,
  },
  priceInEth: {
    type: Number,
  },
});

module.exports = mongoose.model("Order", OrderSchema);
