const dbConfig = require('./../config/db-config');

const create = async (body, fileInfo) => {
    try {
        console.log(JSON.stringify(body));
        console.log(fileInfo.path);
        const [results, metadata] = await dbConfig.query('INSERT INTO fft_bill(BILL_FILEPATH, BILL_DUEDATE, BILL_AMOUNT, BILL_STATUS, USER_ID) VALUES (?, ?, ?, ?, ?)', {
            replacements: [fileInfo? fileInfo.path : "", body.BILL_DUEDATE, body.BILL_AMOUNT, body.BILL_STATUS, body.USER_ID]
        });
        return results;
    }
    catch(err) {
        console.error(err);
        return null;
    }
}

const getAll = async (userId) => {
    try {
        const [results, metadata] = await dbConfig.query('SELECT * FROM fft_bill WHERE USER_ID = ?', {
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
        const [results, metadata] = await dbConfig.query('SELECT * FROM fft_bill WHERE BILL_ID = ? AND USER_ID = ?', {
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
        const [results, metadata] = await dbConfig.query('UPDATE fft_bill SET BILL_STATUS = ? WHERE BILL_ID = ? AND USER_ID = ?', {
            replacements: [body.BILL_STATUS, id, userId]
        });
        return results;
    }
    catch {
        return null;
    }
}

const remove = async (userId, id) => {
    try {
        const [results, metadata] = await dbConfig.query('DELETE FROM fft_bill WHERE BILL_ID = ? AND USER_ID = ?', {
            replacements: [id, userId]
        });
        return results;
    }
    catch {
        return null;
    }
}

module.exports = {create, getAll, getById, update, remove}