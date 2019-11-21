function getBadgesArray(usersWithBadge) {
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

module.exports = {
    getBadgesArray
}