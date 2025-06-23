const dbConfig = require('./../config/db-config');

const create = async (body) => {
    try {
        const [results, metadata] = await dbConfig.query('INSERT INTO fft_user_family(USER_ID, FAMILY_ID, USER_FAMILY_ROLE) VALUES (?, ?, ?)', {
            replacements: [body.USER_ID, body.FAMILY_ID, body.USER_FAMILY_ROLE]
        });
        return results;
    }
    catch {
        return null;
    }
}

const getFamiliesById = async (id) => {
    try {
        const [results, metadata] = await dbConfig.query('SELECT * FROM fft_user_family WHERE USER_ID = ?', {
            replacements: [id] 
        })
        return results; 
    }
    catch {
        return null;
    }
}

const getUsersById = async (id) => {
    try {
        const [results, metadata] = await dbConfig.query('SELECT * FROM fft_user_family WHERE FAMILY_ID = ?', {
            replacements: [id] 
        })
        return results; 
    }
    catch {
        return null;
    }
}

const remove = async (familyId, userId) => {
    try {
        const [results, metadata] = await dbConfig.query('DELETE FROM fft_user_family WHERE FAMILY_ID = ? AND USER_ID = ?', {
            replacements: [familyId, userId]
        });
        return results;
    }
    catch {
        return null;
    }
}

module.exports = {create, getUsersById, getFamiliesById, remove}