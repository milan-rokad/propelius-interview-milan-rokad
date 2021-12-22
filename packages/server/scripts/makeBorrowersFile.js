import fs from "fs";
import path from "path";

import faker from "faker";
import _ from "lodash";

const { pathname: dirname } = new URL(import.meta.url);
const scriptsDir = path.dirname(dirname);
const rootDir = path.dirname(scriptsDir);

const BORROWER_FILE_PATH = path.join(rootDir, "borrowers.json");
const BORROWER_COUNT = 100;

const MARITAL_STATUSES = ["married", "separated", "unmarried"];

function makeBorrower() {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();

  return {
    id: faker.datatype.uuid(),
    firstName,
    lastName,
    dateOfBirth: new Date(faker.date.past(60)).toLocaleDateString(),
    creditScore: faker.datatype.number({ min: 500, max: 900 }),
    maritalStatus: MARITAL_STATUSES[faker.datatype.number({ min: 0, max: 2 })],
    w2Income: faker.datatype.number({ min: 50000, max: 120000 }),
    emailAddress: faker.internet.email(firstName, lastName),
    homePhone: faker.phone.phoneNumber(),
    cellPhone: faker.phone.phoneNumber(),
    currentAddress: faker.address.streetAddress(),
    employer: faker.company.companyName(),
    title: faker.name.title(),
    startDate: new Date(faker.date.past(5)).toLocaleDateString(),
    subjectPropertyAddress: faker.address.streetAddress(),
  };
}

const borrowers = [];
_.times(BORROWER_COUNT, () => {
  borrowers.push(makeBorrower());
});

console.log(`Writing to ${BORROWER_FILE_PATH}.`);

const borrowersStringified = JSON.stringify(borrowers);
fs.writeFileSync(BORROWER_FILE_PATH, borrowersStringified);
