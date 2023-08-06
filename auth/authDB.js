const { Client } = require('pg');
const { connectionString } = require('../config');

function createClient() {
    return new Client({
        connectionString: connectionString,
        application_name: "$auth_management"
    });
}

async function authenticateUser(client, username, password) {
    try {

        const query = 'SELECT username FROM users WHERE username = $1 AND password = $2';
        const values = [username, password];
        const result = await client.query(query, values);

        return result.rows.length > 0;
    } catch (err) {
        console.log(`Error authenticating user: ${err}`);
        return false;
    }
}

async function authenticateAdmin(client, eiin, password) {
    try {

        const query = 'SELECT eiin FROM admin WHERE eiin = $1 AND password = $2';
        const values = [eiin, password];
        const result = await client.query(query, values);

        return result.rows.length > 0;
    } catch (err) {
        console.log(`Error authenticating admin: ${err}`);
        return false;
    }
}


module.exports = {
    createClient,
    authenticateUser,
    authenticateAdmin
}