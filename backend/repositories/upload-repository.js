const dbConfig = require('./../config/db-config');

const uploadFile = async (filename) => {
    return `File uploaded: ${filename}`;
}

module.exports = {uploadFile}