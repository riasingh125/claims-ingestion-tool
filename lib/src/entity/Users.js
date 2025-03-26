
const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "User",
  tableName: "users",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true
    },
    email: {
      type: "varchar",
      unique: true,
      nullable: false
    },
    hashed_password: {
      type: "varchar",
      nullable: false
    },
    created_at: {
        type: "datetime",
        createDate: true,
        default: () => "CURRENT_TIMESTAMP"
    }
  },
  relations: {
    uploads: {
      type: "one-to-many",
      target: "Upload",
      inverseSide: "user",
      cascade: true
    },
    reports: {
      type: "one-to-many",
      target: "Report",
      inverseSide: "user",
      cascade: true
    }
  }
});
