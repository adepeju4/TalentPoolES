// tutorial: https://dev.to/davidokonji/generating-and-downloading-csv-files-using-express-js-1o4i
const { Parser } = require('json2csv');

const downloadResource = (res, fileName, fields, data) => {
  const parser = new Parser({ fields });
  const csv = parser.parse(data);
  res.header('Content-Type', 'text/csv');
  res.attachment(fileName);
  return res.send(csv);
};

module.exports = downloadResource;
