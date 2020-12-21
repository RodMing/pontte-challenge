"use strict";

module.exports = models => ({
    Contract: require("./contract")(models),
});
