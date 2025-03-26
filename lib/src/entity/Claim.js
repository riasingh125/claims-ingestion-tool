const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "Claim",
  tableName: "claims",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true
    },
    icn: {
      type: "varchar",
      nullable: true
    },
    payer_name: {
      type: "varchar",
      nullable: true
    },
    remittance_number: {
      type: "varchar",
      nullable: true
    },
    pmt_date: {
      type: "date",
      nullable: true
    },
    provider_npi: {
      type: "varchar",
      nullable: true
    },
    patient_name: {
      type: "varchar",
      nullable: true
    },
    patient_control_number: {
      type: "varchar",
      nullable: true
    },
    tob: {
      type: "varchar",
      nullable: true
    },
    status_code: {
      type: "varchar",
      nullable: true
    },
    subscriber_id: {
      type: "varchar",
      nullable: true
    },
    clm_charge: {
      type: "numeric",
      nullable: true
    },
    clm_paid_amount: {
      type: "numeric",
      nullable: true
    },
    clm_allow_amount: {
      type: "numeric",
      nullable: true
    },
    clm_denied_amount: {
      type: "numeric",
      nullable: true
    },
    clm_non_covered_amount: {
      type: "numeric",
      nullable: true
    },
    clm_deductible_amount: {
      type: "numeric",
      nullable: true
    },
    clm_co_insurance_amount: {
      type: "numeric",
      nullable: true
    },
    clm_co_pay_amount: {
      type: "numeric",
      nullable: true
    },
    clm_cont_adj_amount: {
      type: "numeric",
      nullable: true
    }
  },
  relations: {
    upload: {
      type: "many-to-one",
      target: "Upload",
      joinColumn: true,
      onDelete: "SET NULL"
    },
    claim_denial_reasons: {
      type: "one-to-many",
      target: "ClaimDenialReason",
      inverseSide: "claim",
      cascade: true
    },
    service_lines: {
      type: "one-to-many",
      target: "ServiceLine",
      inverseSide: "claim",
      cascade: true
    }
  }
});
