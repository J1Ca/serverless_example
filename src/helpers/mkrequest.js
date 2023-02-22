const { isConnected } = require("../database/db");

function mkrequest(action, status) {
  return async (event, context) => {
    context.callbackWaitsForEmptyEventLoop = false;

    try {
      await isConnected();
      const obj = await action(event);
      if (obj) {
        return {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true,
          },
          statusCode: status || 200,
          body: JSON.stringify(obj),
        };
      } else {
        return {
          statusCode: 404,
          body: JSON.stringify({ error: "Not found" }),
        };
      }
    } catch (err) {
      console.error(err);
      return {
        statusCode: err.statusCode || 500,
        body: JSON.stringify({ error: err.message }),
      };
    }
  };
}

module.exports = mkrequest;
