const { createClient } = require('./authDB');
const { generateToken } = require('../authentication');

async function authLogin(req, res) {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required.' });
    }

    const client = createClient();
    try {
        await client.connect();
        const { authenticateUser } = require('./authDB');
        const isAuthenticated = await authenticateUser(client, username, password);

        if (isAuthenticated) {
            const token = generateToken({ username }, 0);
            res.status(200).json({ message: 'Login successful!', token });
        } else {
            res.status(401).json({ error: 'Invalid credentials.' });
        }
    }
    catch (err) {
        console.log(`Error authenticating user: ${err}`);
        res.status(500).json({ error: 'Internal error, please try again.' });
    }
    finally {
        await client.end();
    }

}

async function authLoginAdmin(req, res) {
    const { eiin, password } = req.body;
    if (!eiin || !password) {
        return res.status(400).json({ error: 'eiin and password are required.' });
    }

    const client = createClient();
    try {
        await client.connect();

        const { authenticateAdmin } = require('./authDB');
        const isAuthenticated = await authenticateAdmin(client, eiin, password, 1);

        if (isAuthenticated) {
            const token = generateToken({ eiin }, 1);
            res.status(200).json({ message: 'Login successful!', token });
        } else {
            res.status(401).json({ error: 'Invalid credentials.' });
        }
    }
    catch (err) {
        console.log(`Error authenticating admin: ${err}`);
        res.status(500).json({ error: 'Internal error, please try again.' });
    }
    finally {
        await client.end();
    }
}

module.exports = {
    authLogin,
    authLoginAdmin
}