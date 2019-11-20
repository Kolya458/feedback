const converter = require('csvtojson');
const d = require('./downloadFile')();

const csvToObject = (csvReport) => {
    return converter({
        noheader:true,
        output: "csv"
        })
          .fromString(csvReport)
          .then( csvRow => {
              let reportHeaders = csvRow.slice(0,1);
              let reportData = csvRow.slice(1);
              reportHeaders = reportHeaders.reduce((acc, cur) => acc.concat(cur), []);
              const employee = reportData.length;
              const result = reportData.reduce((acc, cur) => {
                const res = {}
                cur.forEach((el,i) => {
                    res[reportHeaders[i]] = el;
                });
                acc.push(res);
                return acc;
              }, []);

              console.log(reportHeaders, "\n\n\n\n", reportData, result);
        return csvRow;
    })
}



module.exports = csvToObject