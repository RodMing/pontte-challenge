"use strict";

module.exports = (statusCode, message) => {
  let messageTreated = [];
  Array.isArray(message)
    ? (messageTreated = message)
    : messageTreated.push(message);
  
  return {
    statusCode,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true
    },
    body: JSON.stringify({ errors: messageTreated })
  };
};
