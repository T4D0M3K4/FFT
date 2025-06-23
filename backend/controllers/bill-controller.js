const billRepository = require('./../repositories/bill-repository');

const create = async (req, res) => {
    const results = await billRepository.create(req.user.id, req.body);
    res.send(results);
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

module.exports = {create, getAll, getById, update, remove}