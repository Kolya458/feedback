const mockUsers = [
  { firstName: 'Sandra',
    lastName: 'McKenzie',
    photo: '1',
    joinDate: '25-Dec-95',
    salary: '10000',
    salaryUsd: '180',
    badges: 'Tommy Hawley|true|Lois Bolton|true' },
  { firstName: 'Petr',
    lastName: 'McKenzie',
    photo: '1',
    joinDate: '25-Jan-01',
    salary: '100000',
    salaryUsd: '1800',
    badges: 'Tommy Hawley|true|Lois Bolton|true' },
  { firstName: 'Petr',
    lastName: 'Ivanov',
    photo: '1',
    joinDate: '28-Sep-11',
    salary: '50000',
    salaryUsd: '850',
    badges: 'Tommy Hawley|true|Lois Bolton|true' }
];

const mockUser = {
    "user": {
      "email": "jerry@pique.cat",
      "password": "easyHARD6&",
      "firstName": "Jerard",
      "lastName": "Pique",
      "profession": "js coder"
    }
}

const mockEmail = "jerry@pique.cat"
const mockPassword = "easyHARD6&"

mockCredentials = {
  "user": {
    "email": mockEmail,
    "password": mockPassword
  }
}

module.exports = {
  mockUser,
  mockUsers,
  mockCredentials,
  mockEmail,
  mockPassword
}