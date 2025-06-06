const db = require ('../database');

//Get for user with google id
const getUser = async (googleId) => {
    try {
        const [result] = await db.execute ('SELECT * FROM users WHERE google_id = ?', [googleId])
        return result;

    } catch (err) {
        throw err;
    }

};

//Gets a user's refresh token
const getRefreshToken = async (googleId) => {
    try {
        const [rows] = await db.execute ('SELECT refresh_token FROM users WHERE google_id = ?', [googleId])
        
        if (rows && rows.length > 0) {
            
            return rows[0].refresh_token;  
        } else {
            throw new Error('Refresh token no encontrado');
        }
        
    } catch (err) {
        throw err;
    }
    
};

//Inserts a user and their refresh token into the database
const insertUser = async (googleId, refresh_token) => {
    try {
        const [result] = await db.execute ('INSERT INTO users (google_id, refresh_token) VALUES (?, ?)', 
            [googleId, refresh_token]
        )
    } catch (err) {
        throw err;
    }
}

module.exports = { getUser, insertUser, getRefreshToken };