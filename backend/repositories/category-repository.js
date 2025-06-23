const dbConfig = require('./../config/db-config');

const create = async (body) => {
    try {
        const [results, metadata] = await dbConfig.query('INSERT INTO fft_category(CATEGORY_NAME, CATEGORY_TYPE) VALUES (?, ?)', {
            replacements: [body.CATEGORY_NAME, body.CATEGORY_TYPE]
        });
        return results;
    }
    catch {
        return null;
    }
}

const getAll = async () => {
    try {
        const [results, metadata] = await dbConfig.query('SELECT * FROM fft_category');
        return results;
    }
    catch {
        return null;
    }
}

const getById = async (id) => {
    try {
        const [results, metadata] = await dbConfig.query('SELECT * FROM fft_category WHERE CATEGORY_ID = ?', {
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
        const [results, metadata] = await dbConfig.query('UPDATE fft_category SET CATEGORY_NAME = ?, CATEGORY_TYPE = ? WHERE CATEGORY_ID = ?', {
            replacements: [body.CATEGORY_NAME, body.CATEGORY_TYPE, id]
        });
        return results;
    }
    catch {
        return null;
    }
}

const remove = async (id) => {
    try {
        const [results, metadata] = await dbConfig.query('DELETE FROM fft_category WHERE CATEGORY_ID = ?', {
            replacements: [id]
        });
        return results;
    }
    catch {
        return null;
    }
}

module.exports = {create, getAll, getById, update, remove}