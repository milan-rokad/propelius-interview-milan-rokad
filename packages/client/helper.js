import moment from "moment";

export const initialFilter = {
  operand1: null,
  operator: null,
  operand2: null,
};

export const allOperator = {
  EQUALS: "equals",
  INCLUDES: "includes",
  GREATER_THAN_NUMERIC: "greater_than_numeric",
  LESS_THAN_NUMERIC: "less_than_numeric",
  GREATER_THAN_DATE: "greater_than_date",
  LESS_THAN_DATE: "less_than_date",
};

const filterTypes = {
  string: [
    "firstName",
    "lastName",
    "maritalStatus",
    "emailAddress",
    "homePhone",
    "cellPhone",
    "currentAddress",
    "employer",
    "title",
    "subjectPropertyAddress",
  ],
  numeric: ["creditScore", "w2Income"],
  date: ["dateOfBirth", "startDate"],
};

const filterOperators = {
  string: [
    { label: "equals", value: "equals" },
    { label: "includes", value: "includes" },
  ],
  numeric: [
    { label: "greater than", value: "greater_than_numeric" },
    { label: "less than", value: "less_than_numeric" },
  ],
  date: [
    { label: "greater than", value: "greater_than_date" },
    { label: "less than", value: "less_than_date" },
  ],
};

export function getOperatorOptions(operand1) {
  if (filterTypes.string.includes(operand1)) {
    return filterOperators.string;
  } else if (filterTypes.numeric.includes(operand1)) {
    return filterOperators.numeric;
  } else if (filterTypes.date.includes(operand1)) {
    return filterOperators.date;
  } else {
    return [];
  }
}

export function filterData(borrowersData, appliedFilters) {
  let data = borrowersData;

  appliedFilters.forEach((filter) => {
    const { operand1, operand2, operator } = filter;
    if (operand1 && operand2 && operator) {
      console.log(filter);
      // equal
      if (operator === allOperator.EQUALS) {
        data = data.filter((d) => d[operand1] === operand2);
      }

      // includes
      if (operator === allOperator.INCLUDES) {
        data = data.filter((d) => d[operand1].includes(operand2));
      }

      // greater than numeric
      if (operator === allOperator.GREATER_THAN_NUMERIC) {
        data = data.filter((d) => d[operand1] > parseFloat(operand2));
      }

      // less than numeric
      if (operator === allOperator.LESS_THAN_NUMERIC) {
        data = data.filter((d) => d[operand1] < parseFloat(operand2));
      }

      // greater than date
      if (operator === allOperator.GREATER_THAN_DATE) {
        data = data.filter((d) => moment(d[operand1]) > moment(operand2));
      }

      // less than date
      if (operator === allOperator.LESS_THAN_DATE) {
        data = data.filter((d) => moment(d[operand1]) < moment(operand2));
      }
    }
  });

  return data;
}
