const express = require('express');

const app = express();

app.use(express.static('./dist/contact-view'));

app.get('/*', (req, res) =>
    res.sendFile('index.html', {root: 'dist/contact-view/'}),
);

app.listen(process.env.PORT || 8080);