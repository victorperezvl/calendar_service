const db = require ('../database');

const getUser = async (googleId) => {
    try {
        const [result] = await db.execute ('SELECT * FROM users WHERE google_id = ?', [googleId])
        return result;

    } catch (err) {
        throw err;
    }

};

const getRefreshToken = async (googleId) => {
    try {
        const [result] = await db.execute ('SELECT refresh_token FROM users WHERE google_id = ?', [googleId])
        return result;

    } catch (err) {
        throw err;
    }
};

const insertUser = async (googleId, refreshToken) => {
    try {
        const [result] = await db.execute ('INSERT INTO users (google_id, refresh_token) VALUES ?, ?', 
            [googleId, refreshToken]
        )
    } catch (err) {
        throw err;
    }
}

module.exports = { getUser, insertUser, getRefreshToken };