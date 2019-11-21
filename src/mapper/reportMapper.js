const converter = require('csvtojson');

const csvToObject = (csvReport) => {
    return converter({
        noheader:true,
        output: "csv"
        })
        .fromString(csvReport)
        .then( csvRow => {
            const reportHeaders = csvRow.slice(0,1)
                .reduce((acc, cur) => 
                    acc.concat(cur), []);
            const reportData = csvRow.slice(1);
            const result = reportData.reduce((acc, cur) => {
                const res = {}
                cur.forEach((el,i) => {
                    res[reportHeaders[i]] = el;
                });
                acc.push(res);
                return acc;
            }, []);
        return result;
    })
}



module.exports = csvToObject