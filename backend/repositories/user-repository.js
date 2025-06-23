const dbConfig = require('./../config/db-config');
const bcrypt = require('bcryptjs');

const create = async (body) => {
    try {
        const [results, metadata] = await dbConfig.query('INSERT INTO fft_user(USER_NAME, USER_SURNAME, USER_EMAIL, USER_PASSWORD, USER_ROLE, USER_PROFILE_IMAGE) VALUES (?, ?, ?, ?, ?, ?)', {
            replacements: [body.USER_NAME, body.USER_SURNAME, body.USER_EMAIL, body.USER_PASSWORD, body.USER_ROLE, body.USER_PROFILE_IMAGE]
        });
        return results;
    }
    catch {
        return null;
    }
}

const getAll = async () => {
    try {
        const [results, metadata] = await dbConfig.query('SELECT * FROM fft_user');
        return results;
    }
    catch {
        return null;
    }
}

const getById = async (id) => {
    try {
        const [results, metadata] = await dbConfig.query('SELECT * FROM fft_user WHERE USER_ID = ?', {
            replacements: [id] 
        })
        return results[0]; 
    }
    catch {
        return null;
    }
}

const update = async (id, body) => {
    try {
        const hashedPassword = await bcrypt.hash(body.USER_PASSWORD, 10);
        const [results, metadata] = await dbConfig.query('UPDATE fft_user SET USER_NAME = ?, USER_SURNAME = ?, USER_EMAIL = ?, USER_PASSWORD = ?, USER_ROLE = ? WHERE USER_ID = ?', {
            replacements: [body.USER_NAME, body.USER_SURNAME, body.USER_EMAIL, hashedPassword, body.USER_ROLE, id]
        });
        return results;
    }
    catch {
        return null;
    }
}

const remove = async (id) => {
    try {
        const [results, metadata] = await dbConfig.query('DELETE FROM fft_user WHERE USER_ID = ?', {
            replacements: [id]
        });
        return results;
    }
    catch {
        return null;
    }
}

module.exports = {create, getAll, getById, update, remove}