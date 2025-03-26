const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "ServiceLine",
  tableName: "service_lines",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true
    },
    date_service_start: {
      type: "date",
      nullable: true
    },
    date_service_end: {
      type: "date",
      nullable: true
    },
    revenue_code: {
      type: "varchar",
      nullable: true
    },
    hcpcs: {
      type: "varchar",
      nullable: true
    },
    modifier: {
      type: "varchar",
      nullable: true
    },
    units: {
      type: "int",
      nullable: true
    },
    svc_charge: {
      type: "numeric",
      nullable: true
    },
    svc_paid_amount: {
      type: "numeric",
      nullable: true
    },
    svc_allow_amount: {
      type: "numeric",
      nullable: true
    },
    svc_denied_amount: {
      type: "numeric",
      nullable: true
    },
    svc_non_covered_amount: {
      type: "numeric",
      nullable: true
    },
    svc_deductible_amount: {
      type: "numeric",
      nullable: true
    },
    svc_co_insurance_amount: {
      type: "numeric",
      nullable: true
    },
    svc_co_pay_amount: {
      type: "numeric",
      nullable: true
    },
    svc_cont_adj_amount: {
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
    },
    service_line_denial_reasons: {
      type: "one-to-many",
      target: "ServiceLineDenialReason",
      inverseSide: "service_line",
      cascade: true
    }
  }
});
