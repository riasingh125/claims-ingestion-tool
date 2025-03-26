const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "Report",
  tableName: "reports",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true
    },
    report_name: {
      type: "varchar",
      nullable: true
    },
    config: {
      type: "simple-json",
      nullable: true
    },
    created_at: {
        type: "datetime",
        createDate: true,
        default: () => "CURRENT_TIMESTAMP"
    }
  },
  relations: {
    user: {
      type: "many-to-one",
      target: "User",
      joinColumn: true,
      onDelete: "CASCADE"
    }
  }
});
