const dbConfig = require('./../config/db-config');

const create = async (body) => {
    try {
        const [results, metadata] = await dbConfig.query('INSERT INTO fft_family(FAMILY_SURNAME) VALUES (?)', {
            replacements: [body.FAMILY_SURNAME]
        });
        return results;
    }
    catch {
        return null;
    }
}

const getAll = async () => {
    try {
        const [results, metadata] = await dbConfig.query('SELECT * FROM fft_family');
        return results;
    }
    catch {
        return null;
    }
}

const getById = async (id) => {
    try {
        const [results, metadata] = await dbConfig.query('SELECT * FROM fft_family WHERE FAMILY_ID = ?', {
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
        const [results, metadata] = await dbConfig.query('UPDATE fft_family SET FAMILY_SURNAME = ? WHERE FAMILY_ID = ?', {
            replacements: [body.FAMILY_SURNAME, id]
        });
        return results;
    }
    catch {
        return null;
    }
}

const remove = async (id) => {
    try {
        const [results, metadata] = await dbConfig.query('DELETE FROM fft_family WHERE FAMILY_ID = ?', {
            replacements: [id]
        });
        return results;
    }
    catch {
        return null;
    }
}

module.exports = {create, getAll, getById, update, remove}