const userFamilyRepository = require('./../repositories/user_family-repository');

const create = async (req, res) => {
    const results = await userFamilyRepository.create(req.body);
    res.send(results);
}

const getFamiliesById = async (req, res) => {
    const results = await userFamilyRepository.getFamiliesById(req.params.id);
    res.send(results);
}

const getUsersById = async (req, res) => {
    const results = await userFamilyRepository.getUsersById(req.params.id);
    res.send(results);
}

const remove = async (req, res) => {
    const results = await userFamilyRepository.remove(req.params.familyId, req.params.userId);
    res.send(results);
}

module.exports = {create, getFamiliesById, getUsersById, remove}