const dbConfig = require('./../config/db-config');

const create = async (userId, body) => {
    try {
        const [results, metadata] = await dbConfig.query('INSERT INTO fft_budget(BUDGET_NAME, BUDGET_AMOUNT, BUDGET_STARTDATE, BUDGET_ENDDATE, CATEGORY_ID, USER_ID) VALUES (?, ?, ?, ?, ?, ?)', {
            replacements: [body.BUDGET_NAME,body.BUDGET_AMOUNT, body.BUDGET_STARTDATE, body.BUDGET_ENDDATE, body.CATEGORY_ID, userId]
        });
        return results;
    }
    catch (err) {
        console.log(err);
        return null;
    }
}

const getAll = async (userId) => {
    try {
        const [results, metadata] = await dbConfig.query('SELECT * FROM fft_budget b \
                                                           INNER JOIN fft_category c ON c.CATEGORY_ID=b.CATEGORY_ID \
                                                            WHERE USER_ID = ? AND c.CATEGORY_TYPE LIKE \'%Budget%\'', {
            replacements: [userId]
        });
        return results;
    }
    catch {
        return null;
    }
}

const getById = async (userId, id) => {
    try {
        const [results, metadata] = await dbConfig.query('SELECT * FROM fft_budget WHERE BUDGET_ID = ? AND USER_ID = ?', {
            replacements: [id, userId] 
        })
        return results[0]; 
    }
    catch (err) {
        console.log(err);
        return null;
    }
}

const update = async (userId, id, body) => {
    try {
        const [results, metadata] = await dbConfig.query('UPDATE fft_budget SET BUDGET_AMOUNT = ?, BUDGET_STARTDATE = ?, BUDGET_ENDDATE = ? WHERE BUDGET_ID = ? AND USER_ID = ?', {
            replacements: [body.BUDGET_AMOUNT, body.BUDGET_STARTDATE, body.BUDGET_ENDDATE, id, userId]
        });
        return results;
    }
    catch {
        return null;
    }
}

const remove = async (userId, id) => {
    try {
        const [results, metadata] = await dbConfig.query('DELETE FROM fft_budget WHERE BUDGET_ID = ? AND USER_ID = ?', {
            replacements: [id, userId]
        });
        return results;
    }
    catch {
        return null;
    }
}

module.exports = {create, getAll, getById, update, remove}