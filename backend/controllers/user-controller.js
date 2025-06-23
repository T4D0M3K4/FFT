const userRepository = require('./../repositories/user-repository');

const create = async (req, res) => {
    const results = await userRepository.create(req.body);
    res.send(results);
}

const getAll = async (req, res) => {
    const results = await userRepository.getAll();
    res.send(results);
}

const getById = async (req, res) => {
    const results = await userRepository.getById(req.params.id);
    res.send(results);
}

const update = async (req, res) => {
    const results = await userRepository.update(req.params.id, req.body);
    res.send(results);
}

const remove = async (req, res) => {
    const results = await userRepository.remove(req.params.id);
    res.send(results);
}

module.exports = {create, getAll, getById, update, remove}