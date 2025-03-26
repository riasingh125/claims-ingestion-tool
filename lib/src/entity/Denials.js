
const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "ClaimDenialReason",
  tableName: "claim_denial_reasons",
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
    claim: {
      type: "many-to-one",
      target: "Claim",
      joinColumn: true,
      onDelete: "CASCADE"
    }
  }
});
