const familyRepository = require('./../repositories/family-repository');

const create = async (req, res) => {
    const results = await familyRepository.create(req.body);
    res.send(results);
}

const getAll = async (req, res) => {
    const results = await familyRepository.getAll();
    res.send(results);
}

const getById = async (req, res) => {
    const results = await familyRepository.getById(req.params.id);
    res.send(results);
}

const update = async (req, res) => {
    const results = await familyRepository.update(req.params.id, req.body);
    res.send(results);
}

const remove = async (req, res) => {
    const results = await familyRepository.remove(req.params.id);
    res.send(results);
}

module.exports = {create, getAll, getById, update, remove}