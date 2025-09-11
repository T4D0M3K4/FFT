const dbConfig = require('./../config/db-config');

const create = async (userId, body) => {
    try {
        const [results, metadata] = await dbConfig.query('INSERT INTO fft_transaction(TRANSACTION_TYPE, TRANSACTION_AMOUNT, TRANSACTION_DATE, TRANSACTION_DESCRIPTION, USER_ID, CATEGORY_ID, BUDGET_ID) VALUES (?, ?, ?, ?, ?, ?, ?)', {
            replacements: [body.TRANSACTION_TYPE, body.TRANSACTION_AMOUNT, body.TRANSACTION_DATE, body.TRANSACTION_DESCRIPTION, userId, body.CATEGORY_ID, body.BUDGET_ID]
        });
        return results;
    }
    catch {
        return null;
    }
}

const getAll = async (userId) => {
    try {
        const [results, metadata] = await dbConfig.query('SELECT * FROM fft_transaction t \
                                                            INNER JOIN fft_category c on c.CATEGORY_ID=t.CATEGORY_ID \
                                                            INNER JOIN fft_budget b on b.BUDGET_ID = t.BUDGET_ID \
                                                            WHERE t.USER_ID = ? AND c.CATEGORY_TYPE LIKE \'%Transaction%\'', {
            replacements: [userId]
        });
        return results;
    }
    catch (err) {
        console.log(err);
        return null;
    }
}

const getById = async (userId, id) => {
    try {
        const [results, metadata] = await dbConfig.query('SELECT * FROM fft_transaction WHERE TRANSACTION_ID = ? AND USER_ID = ?', {
            replacements: [id, userId] 
        })
        return results[0]; 
    }
    catch {
        return null;
    }
}

const update = async (userId, id, body) => {
    try {
        const [results, metadata] = await dbConfig.query('UPDATE fft_transaction SET TRANSACTION_AMOUNT = ?, TRANSACTION_DESCRIPTION = ?, CATEGORY_ID = ?, BUDGET_ID = ? WHERE TRANSACTION_ID = ? AND USER_ID = ?', {
            replacements: [body.TRANSACTION_AMOUNT, body.TRANSACTION_DESCRIPTION, body.CATEGORY_ID, body.BUDGET_ID, id, userId]
        });
        return results;
    }
    catch {
        return null;
    }
}

const remove = async (userId, id) => {
    try {
        const [results, metadata] = await dbConfig.query('DELETE FROM fft_transaction WHERE TRANSACTION_ID = ? AND USER_ID = ?', {
            replacements: [id, userId]
        });
        return results;
    }
    catch {
        return null;
    }
}

module.exports = {create, getAll, getById, update, remove}