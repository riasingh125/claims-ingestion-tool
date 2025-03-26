const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "ServiceLineDenialReason",
  tableName: "service_line_denial_reasons",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true
    },
    denial_group: {
      type: "varchar",
      nullable: true
    },
    denial_code: {
      type: "varchar",
      nullable: true
    },
    denial_amount: {
      type: "numeric",
      nullable: true
    }
  },
  relations: {
    service_line: {
      type: "many-to-one",
      target: "ServiceLine",
      joinColumn: true,
      onDelete: "CASCADE"
    }
  }
});
