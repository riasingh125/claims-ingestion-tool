require("reflect-metadata");
const { DataSource } = require("typeorm");
const Users = require("./entity/Users");
const Files = require("./entity/Files");
const Claim = require("./entity/Claim");
const Denials = require("./entity/Denials");
const ServiceLine = require("./entity/ServiceLine");
const ServiceLineDenialReason = require("./entity/ServiceLineDenialReason");
const Reports = require("./entity/Reports");

const AppDataSource = new DataSource({
  type: "sqlite",
  database: "database.sqlite",
  synchronize: true, // Note: For production, consider using migrations instead.
  logging: false,
  entities: [Users, Claim, Files, Denials, ServiceLine, ServiceLineDenialReason, Reports],
});

console.log("AppDataSource", AppDataSource);

module.exports = { AppDataSource };
