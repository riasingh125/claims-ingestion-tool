
const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "Upload",
  tableName: "uploads",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true
    },
    file_name: {
      type: "varchar",
      nullable: true
    },
    upload_timestamp: {
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
    },
    claims: {
      type: "one-to-many",
      target: "Claim",
      inverseSide: "upload",
      cascade: true
    }
  }
});
