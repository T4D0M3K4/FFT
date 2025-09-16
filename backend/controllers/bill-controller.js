const path = require('path');
const billRepository = require('./../repositories/bill-repository');

const create = async (req, res) => {
    try {
        const fileInfo = req.file ? {
            filename: req.file.filename,
            path: req.file.path,
            mimetype: req.file.mimetype,
            size: req.file.size
        } : null;

        const results = await billRepository.create(req.body, fileInfo);
        res.send(results);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}

const getAll = async (req, res) => {
    const results = await billRepository.getAll(req.user.id);
    res.send(results);
}

const getById = async (req, res) => {
    const results = await billRepository.getById(req.user.id, req.params.id);
    res.send(results);
}

const update = async (req, res) => {
    const results = await billRepository.update(req.user.id, req.params.id, req.body);
    res.send(results);
}

const remove = async (req, res) => {
    const results = await billRepository.remove(req.user.id, req.params.id);
    res.send(results);
}

const download = async (req, res) =>{
    try {
        const bill = await billRepository.getById(req.user.id, req.params.id);
        const filePath = path.resolve(bill.BILL_FILEPATH);
        res.download(filePath);
    }
    catch {
        return null;
    }
}

module.exports = {create, getAll, getById, update, remove, download}