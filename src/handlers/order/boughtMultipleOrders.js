const Order = require("../../models/order");
const mkrequest = require("../../helpers/mkrequest");

module.exports.handler = mkrequest(async (event) => {
  const { orderId } = JSON.parse(event.body);

  const promises = orderId.map(
    async (order) =>
      await Order.findOneAndUpdate(
        { _id: order },
        {
          $set: {
            signature: "BOUGHT",
            state: "BOUGHT",
            endTime: Math.floor(Date.now() / 1000),
          },
        },
      ),
  );

  return await Promise.all(promises);
});
