const { Client } = require('pg');
const { connectionString } = require('../config');

function createClient() {
    return new Client({
        connectionString: connectionString,
        application_name: "$admin_management"
    });
}

async function userAvailable(client, username) {
    try {
        const query = 'SELECT COUNT(*) FROM users WHERE username = $1';
        const values = [username];

        const result = await client.query(query, values);

        return result.rows[0].count === '0';
    }
    catch (err) {
        console.log(`Error checking user availability: ${err}`);
        return false;
    }
}


async function createUser(client, eiin, username, password) {
    try {
        const query = 'INSERT INTO users (eiin,username,password) VALUES ($1,$2,$3)';
        const values = [eiin, username, password];

        await client.query(query, values);

        return true;
    } catch (err) {
        console.log(`Error creating user: ${err}`);
        return false;
    }
}


module.exports = {
    createClient,
    createUser,
    userAvailable
}