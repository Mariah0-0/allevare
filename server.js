const express = require('express');
const app = express();
const myModule = require('./myModule');
const mySess = require('./mySession');
const querystring = require('querystring');

app.use(express.static(__dirname));

app.post('/login', (req, res) => {
    let body = '';

    req.on('data', chunk => {
        body += chunk.toString();
    });

    req.on('end', () => {
        const parsedBody = querystring.parse(body);
        myModule.authenticateUser(res, parsedBody, mySess, myModule.preAuthentication);
    });

});

app.post('/register', (req, res) => {
    let body = '';

    req.on('data', chunk => {
        body += chunk.toString();
    });

    req.on('end', () => {
        const parsedBody = querystring.parse(body);
        myModule.addUser(res, parsedBody, mySess, myModule.preAuthentication);
    });
});

app.get('/dashboard', (req, res) => {
    const s = mySess.getMySession();

    myModule.navigateToDashboard1(res, s);
});

app.get('/data', (req, res) => {
    const s = mySess.getMySession();

    myModule.fetchRecords(s)
        .then((result) => {
            res.json(result);
        })
        .catch((error) => {
            console.error('Error fetching records:', error);
            res.status(500).json({ error: 'Failed to fetch records' });
        });
});

app.get('/entryPage', (req, res) => {
    const s = mySess.getMySession();
    var u = s.username;

    myModule.checkRecords(s)
        .then((result) => {
            res.json({ result, u });
        })
        .catch((error) => {
            console.error('Error fetching records:', error);
            res.status(500).json({ error: 'Failed to fetch records' });
        });
});

app.post('/addEntry', (req, res) => {
    const s = mySess.getMySession();
    let body = '';

    req.on('data', chunk => {
        body += chunk.toString();
    });

    req.on('end', () => {
        const parsedBody = querystring.parse(body);
        myModule.addEntry(res, parsedBody, s, myModule.navigateToDashboard2);
    });
});

app.get('/logout', (req, res) => {
    s = mySess.getMySession();
    if (s !== undefined) {
        if (s.username != "" && s.username !== undefined) {
            mySess.deleteSession();
        }
    } else {
        myModule.login(res);
    }
    myModule.logout(res);
});

app.listen(8080, () => {
    console.log('Server is running on port 8080');
});
