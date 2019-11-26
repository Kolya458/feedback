const getBadgesArray = (usersWithBadge) => {
    const badgesArray = [];
    const flatBadgesArray = usersWithBadge['badges'].split('|');
    const entries = [];
    
    for (let i=0; i<flatBadgesArray.length; i+=2) {
        entries.push([flatBadgesArray[i], flatBadgesArray[i+1]]);
    }

    for(let el of entries){
        badgesArray.push({name: el[0], data: el[1]})
    }

    return badgesArray;
}

const sortBySalary = ( firstUser, secondUser) => {
    const firstUserSalary = new Number(firstUser["salary"]);
    const secondUserSalary = new Number(secondUser["salary"]);
    return secondUserSalary - firstUserSalary;
};

const getSortedSalaries = reportsArray => {
    reportsArray.sort(sortBySalary);
    const highSalariesArray = reportsArray.map(user => {
        return {
            name: user.firstName,
            lastName: user.lastName,
            salary: user.salary,
            salaryUsd: user.salaryUsd

        }
    });
    return highSalariesArray;
};

const sortByDate = ( firstUser, secondUser) => {
    const firstUserDate = Date.parse(firstUser["joinDate"]);
    const secondUserDate = Date.parse(secondUser["joinDate"]);
    return secondUserDate - firstUserDate; 
};
  
const newUsers = reportsArray => {
    reportsArray.sort(sortByDate);
    const newUsersArray = reportsArray.map(user => {
        return {
            name: user.firstName,
            lastName: user.lastName,
            join_date: user.joinDate
        }
    });
    return newUsersArray;
};

const usersWithBadges = reportsArray => {
    const usersWithBadges = reportsArray
        .filter(x => x['badges'] !== '')
        .map(user => {
            return {
                name: user.firstName,
                lastName: user.lastName,
                badges: getBadgesArray(user)
            }
    });
    return usersWithBadges;
};

module.exports = {
    getBadgesArray,
    getSortedSalaries,
    newUsers,
    usersWithBadges
}