import {config} from "../../config";
import * as mariadb from "./mariadb";
import * as sqlite from "./sqlite";

export const Migrations = (() => {
  switch (config.orm.driver) {
    case "sqlite":
      return sqlite.Migrations;
    case "mariadb":
      return mariadb.Migrations;
    default:
      return [];
  }
})();
