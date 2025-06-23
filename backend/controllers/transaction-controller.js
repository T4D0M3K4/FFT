const transactionRepository = require('./../repositories/transaction-repository');

const create = async (req, res) => {
    const results = await transactionRepository.create(req.user.id, req.body);
    res.send(results);
}

const getAll = async (req, res) => {
    const results = await transactionRepository.getAll(req.user.id);
    res.send(results);
}

const getById = async (req, res) => {
    const results = await transactionRepository.getById(req.user.id, req.params.id);
    res.send(results);
}

const update = async (req, res) => {
    const results = await transactionRepository.update(req.user.id, req.params.id, req.body);
    res.send(results);
}

const remove = async (req, res) => {
    const results = await transactionRepository.remove(req.user.id, req.params.id);
    res.send(results);
}

module.exports = {create, getAll, getById, update, remove}