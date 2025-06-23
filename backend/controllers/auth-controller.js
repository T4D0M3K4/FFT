const authRepository = require('./../repositories/auth-repository');

const register = async (req, res) => {
    const results = await authRepository.register(req.body);
    res.send(results);
}

const login = async (req, res) => {
    const results = await authRepository.login(req.body);
    res.send(results);
}

module.exports = {register, login}