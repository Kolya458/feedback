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

const expectedNewUsersResult = [
    {
        "name": "Petr",
        "lastName": "Ivanov",
        "join_date": "28-Sep-11"
    },
    {
        "name": "Petr",
        "lastName": "McKenzie",
        "join_date": "25-Jan-01"
    },
    {
        "name": "Sandra",
        "lastName": "McKenzie",
        "join_date": "25-Dec-95"
    }
];

const expectedSortedSalariesResult = [ 
    { 
        name: 'Petr',
        lastName: 'McKenzie',
        salary: '100000',
        salaryUsd: '1800' 
    },
    { 
        name: 'Petr',
        lastName: 'Ivanov',
        salary: '50000',
        salaryUsd: '850' 
    },
    { 
        name: 'Sandra',
        lastName: 'McKenzie',
        salary: '10000',
        salaryUsd: '180' 
    } 
];

const mockEmail = "jerry@pique.cat"
const mockPassword = "easyHARD6&"


  module.exports = {
    mockUsers, 
    expectedNewUsersResult,
    expectedSortedSalariesResult,
    mockEmail,
    mockPassword
  }