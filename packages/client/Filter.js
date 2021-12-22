import React, { useEffect, useState } from "react";
import { COLUMN_KEYS } from "./App";
import { initialFilter, getOperatorOptions } from "./helper";

export default function Filter({ appliedFilters, setAppliedFilters }) {
  const handleAddFilter = () => {
    setAppliedFilters([...appliedFilters, initialFilter]);
  };

  const handleSetFilter = (index, updatedFilter) => {
    let clonedFilter = JSON.parse(JSON.stringify(appliedFilters));
    clonedFilter[index] = updatedFilter;
    setAppliedFilters(clonedFilter);
  };

  return (
    <div>
      <button onClick={handleAddFilter}>Add Filter</button>
      <button onClick={() => setAppliedFilters([initialFilter])}>
        Reset Filter
      </button>

      {appliedFilters.map((filter, i) => {
        return (
          <div key={i} className="filter-container">
            <IndividualFilter
              setFilter={(updatedFilter) => handleSetFilter(i, updatedFilter)}
            />
          </div>
        );
      })}
    </div>
  );
}

function IndividualFilter(props) {
  const { setFilter } = props;

  const [operand1, setOperand1] = useState(null);
  const [operator, setOperator] = useState(null);
  const [operand2, setOperand2] = useState(null);

  const [operatorOptions, setOperatorOptions] = useState([]);

  useEffect(() => {
    const operatorOptions = getOperatorOptions(operand1);
    setOperatorOptions(operatorOptions);
  }, [operand1]);

  useEffect(() => {
    if (operand1 && operand2 && operator) {
      setFilter({
        operand1,
        operator,
        operand2,
      });
    }
  }, [operand1, operator, operand2]);

  return (
    <div className="individual-filter-container">
      <div className="filter-field">
        <select
          onChange={(e) => {
            setOperand1(e.target.value);
          }}
        >
          <option></option>
          {COLUMN_KEYS.map((col, j) => {
            return <option key={j}>{col}</option>;
          })}
        </select>
      </div>

      <div className="filter-field">
        <select
          onChange={(e) => {
            setOperator(e.target.value);
          }}
        >
          <option value=""></option>
          {operatorOptions.map((col, k) => {
            return (
              <option key={k} value={col.value}>
                {col.label}
              </option>
            );
          })}
        </select>
      </div>

      <div className="filter-field">
        <input
          type="text"
          onChange={(e) => {
            setOperand2(e.target.value);
          }}
        />
      </div>
    </div>
  );
}
