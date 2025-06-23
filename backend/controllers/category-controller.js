const categoryRepository = require('./../repositories/category-repository');

const create = async (req, res) => {
    const results = await categoryRepository.create(req.body);
    res.send(results);
}

const getAll = async (req, res) => {
    const results = await categoryRepository.getAll();
    res.send(results);
}

const getById = async (req, res) => {
    const results = await categoryRepository.getById(req.params.id);
    res.send(results);
}

const update = async (req, res) => {
    const results = await categoryRepository.update(req.params.id, req.body);
    res.send(results);
}

const remove = async (req, res) => {
    const results = await categoryRepository.remove(req.params.id);
    res.send(results);
}

module.exports = {create, getAll, getById, update, remove}