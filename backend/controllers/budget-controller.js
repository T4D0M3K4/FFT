const budgetRepository = require('./../repositories/budget-repository');

const create = async (req, res) => {
    const results = await budgetRepository.create(req.user.id, req.body);
    res.send(results);
}

const getAll = async (req, res) => {
    const results = await budgetRepository.getAll(req.user.id);
    res.send(results);
}

const getById = async (req, res) => {
    const results = await budgetRepository.getById(req.user.id, req.params.id);
    res.send(results);
}

const update = async (req, res) => {
    const results = await budgetRepository.update(req.user.id, req.params.id, req.body);
    res.send(results);
}

const remove = async (req, res) => {
    const results = await budgetRepository.remove(req.user.id, req.params.id);
    res.send(results);
}

module.exports = {create, getAll, getById, update, remove}