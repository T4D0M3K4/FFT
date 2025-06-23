const uploadRepository = require('./../repositories/upload-repository');

const uploadFile = async (req, res) => {
    const results = await uploadRepository.uploadFile(req.file.filename);
    res.send(results);
}

module.exports = {uploadFile}