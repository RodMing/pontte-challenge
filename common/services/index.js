"use strict";

const servicesLoadedMap = new Map();

function getService(serviceName, module) {
  if (!servicesLoadedMap.has(serviceName)) {
    servicesLoadedMap.set(serviceName, module());
  }
  return servicesLoadedMap.get(serviceName);
}

module.exports = (sequelize, logger) => {
  const repositories = require("../repositories")(
    require("../models")(sequelize)
  );

  return {};
};
