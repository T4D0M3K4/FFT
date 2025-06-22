const dbConfig = require('../config/db-config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (user) => {
    try {
        const hashedPassword = await bcrypt.hash(user.USER_PASSWORD, 10);
        const [results, metadata] = await dbConfig.query('INSERT INTO fft_user (USER_NAME, USER_SURNAME, USER_EMAIL, USER_PASSWORD) VALUES (?, ?, ?, ?)', {
            replacements: [user.USER_NAME, user.USER_SURNAME, user.USER_EMAIL, hashedPassword]
        });
        return results;
    }
    catch {
        return null;
    }
}

const login = async (body) => {
    try {
        const [results, metadata] = await dbConfig.query('SELECT * FROM fft_user WHERE USER_EMAIL = ?', {
            replacements: [body.USER_EMAIL]
        });
        if (!results[0]) return null;

        const isMatch = await bcrypt.compare(body.USER_PASSWORD, results[0].USER_PASSWORD);
        if (!isMatch) return null;

        const token = jwt.sign({id: results[0].USER_ID, role: results[0].USER_ROLE}, process.env.JWT_SECRET, {expiresIn: '1d'});
        return token;
    }
    catch {
        return null;
    }
}

module.exports = {register, login}