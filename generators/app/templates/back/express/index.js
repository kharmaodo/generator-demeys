const express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    context = '/api';

app.get(context + '/', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({"projectName": "<%= projectName %>"}));  
});

app.listen(port);

console.log('server started on port %s', port);