const authRepository = require('./../repositories/auth-repository');

const register = async (req, res) => {
    const results = await authRepository.register(req.body);

    if (results) {
        res.status(201).send(results);
    }
    else {
        res.status(400).send(null);
    }
}

const login = async (req, res) => {
    const results = await authRepository.login(req.body);

    if (results) {
        res.send(results);
    }
    else {
        res.status(400).send(null);
    }
}

module.exports = {register, login}