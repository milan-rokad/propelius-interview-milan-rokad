import axios from "axios";
import React, { useEffect, useState } from "react";
import Filter from "./Filter";
import { allOperator, filterData, initialFilter } from "./helper";
import "./style.css";

export const COLUMN_KEYS = [
  "firstName",
  "lastName",
  "dateOfBirth",
  "creditScore",
  "maritalStatus",
  "w2Income",
  "emailAddress",
  "homePhone",
  "cellPhone",
  "currentAddress",
  "employer",
  "title",
  "startDate",
  "subjectPropertyAddress",
];

async function getBorrowers() {
  const { data: borrowers } = await axios("http://localhost:1337/borrowers");
  return borrowers;
}

function App() {
  const [borrowersData, setBorrowersData] = useState([]);
  const [borrowers, setBorrowers] = useState([]);
  const [appliedFilters, setAppliedFilters] = useState([initialFilter]);

  useEffect(async () => {
    const newBorrowers = await getBorrowers();
    setBorrowersData(newBorrowers);
    setBorrowers(newBorrowers);
  }, []);

  useEffect(() => {
    let data = filterData(borrowersData, appliedFilters);
    setBorrowers(data);
  }, [appliedFilters]);

  return (
    <div>
      <h3>Borrowers {borrowers?.length}</h3>
      <Filter {...{ appliedFilters, setAppliedFilters }} />
      <table>
        <thead>
          <tr>
            {COLUMN_KEYS.map((columnKey) => (
              <th key={columnKey}>{columnKey}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {borrowers.map((borrower) => {
            return (
              <tr key={borrower.id}>
                {COLUMN_KEYS.map((columnKey) => (
                  <td key={columnKey}>{borrower[columnKey]}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
