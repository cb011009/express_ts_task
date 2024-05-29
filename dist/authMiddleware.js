"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        res.setHeader('WWW-Authenticate', 'Basic');
        return res.status(401).json({ error: 'Authentication required' });
    }
    const base64Credentials = authHeader.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [username, password] = credentials.split(':');
    const authUsername = process.env.AUTH_USERNAME;
    const authPassword = process.env.AUTH_PASSWORD;
    console.log('Received username:', username);
    console.log('Expected username:', authUsername);
    console.log('Received password:', password);
    console.log('Expected password:', authPassword);
    if (username === authUsername && password === authPassword) {
        next();
    }
    else {
        console.log('Authentication failed. Incorrect username or password.');
        return res.status(403).json({ error: 'Forbidden' });
    }
};
exports.authenticate = authenticate;
