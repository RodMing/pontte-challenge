"use strict";

module.exports = models => ({
    Contract: require("./contract")(models),
    ContractImage: require("./contractImage")(models),
});
