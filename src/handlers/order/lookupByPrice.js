const Order = require("../../models/order");
const mkrequest = require("../../helpers/mkrequest");

module.exports.handler = mkrequest((event) => {
  const { minPrice, maxPrice, order, limit, page } = event.queryStringParameters;
  return Order.aggregate([
    {
      $match: {
        state: "VALID",
        $or: [{ orderCode: "SIMPLE_ORDER" }, { orderCode: "AVANCED_ORDER" }],
      },
    },
    {
      $lookup: {
        from: "considerations",
        localField: "considerationId",
        foreignField: "_id",
        as: "considerationId",
      },
    },
    {
      $lookup: {
        from: "offers",
        localField: "offerId",
        foreignField: "_id",
        as: "offerId",
      },
    },
    {
      $match: {
        priceInEth: {
          $gte: +minPrice,
          $lte: +maxPrice,
        },
      },
    },
    {
      $sort: {
        priceInEth: +order,
      },
    },
    {
      $skip: +limit * (+page - 1),
    },
    {
      $limit: +limit,
    },
  ]);
});
